import BaseSwitchStatement from './BaseSwitchStatement'
import { ArgumentList, Argument, Identifier } from '../grammar'
import {EnumeratedCategoryType, VoidType, CategoryType, TypeMap} from '../type'
import {Context, ErrorVariable, Transpiler} from '../runtime'
import { ExecutionError } from '../error'
import { UnresolvedParameter } from '../param'
import { ConstructorExpression } from '../expression'
import { TextLiteral } from '../literal'
import {StatementList, SwitchCaseList} from "../statement";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class SwitchErrorStatement extends BaseSwitchStatement {

    errorId: Identifier;
    statements: StatementList;
    alwaysInstructions: StatementList | null;

    constructor(errorId: Identifier, statements: StatementList, handlers: SwitchCaseList, anyStmts: StatementList | null, alwaysStmts: StatementList | null) {
        super(handlers, anyStmts);
        this.errorId = errorId;
        this.statements = statements;
        this.alwaysInstructions = alwaysStmts;
    }

    locateSectionAtLine(line: number) {
        let section;
        if(this.statements instanceof StatementList) {
            section = this.statements.locateSectionAtLine(line);
            if(section != null)
                return section;
        }
        section = this.switchCases.locateSectionAtLine(line, false);
        if(section != null)
            return section;
        if(this.defaultCase instanceof StatementList) {
            section = this.defaultCase.locateSectionAtLine(line);
            if(section != null)
                return section;
        }
        if(this.alwaysInstructions instanceof StatementList)
            return this.alwaysInstructions.locateSectionAtLine(line);
        else
            return null;
    }

    checkSwitchCasesType(context: Context) {
        const child = context.newChildContext();
        child.registerInstance(new ErrorVariable(this.errorId), true);
        super.checkSwitchCasesType(child);
    }

    checkSwitchType(context: Context) {
        return new EnumeratedCategoryType(new Identifier("Error"));
    }

    collectReturnTypes(context: Context, types: TypeMap) {
        let type = this.statements.check(context, null);
        if(type && type != VoidType.instance) {
            types.add(type);
        }
        const child = context.newChildContext();
        child.registerInstance(new ErrorVariable(this.errorId), true);
        const section = super.collectReturnTypes(child, types);
        if(this.alwaysInstructions!=null) {
            type = this.alwaysInstructions.check(context, null);
            if(type != VoidType.instance) {
                types.add(type);
            }
        }
        return section;
    }

    interpret(context: Context): IValue | null {
        let result = null;
        try {
            result = this.statements.interpret(context);
        } catch ( e) {
            if(e instanceof ExecutionError) {
                const switchValue = this.populateError(e, context);
                result = this.interpretSwitch(context, switchValue, e);
            } else {
                throw e;
            }
        } finally {
            if(this.alwaysInstructions!=null) {
                this.alwaysInstructions.interpret(context);
            }
        }
        return result;
    }

    populateError(e: ExecutionError, context: Context) {
        let exp = e.getExpression(context);
        if(!exp) {
            const args = new ArgumentList();
            args.add(new Argument(new UnresolvedParameter(new Identifier("name")), new TextLiteral(typeof(e))));
            args.add(new Argument(new UnresolvedParameter(new Identifier("text")), new TextLiteral(e.message)));
            exp = new ConstructorExpression(new CategoryType(new Identifier("Error")), null, args);
        }
        if(context.getRegisteredInstance(this.errorId) == null) {
            context.registerInstance(new ErrorVariable(this.errorId), true);
        }
        const error = exp.interpret(context);
        context.setValue(this.errorId, error);
        return error;
    }

    toDialect(writer: CodeWriter): void {
        writer = writer.newLocalWriter();
        writer.context.registerInstance(new ErrorVariable(this.errorId), true);
        super.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("try (").append(this.errorId.name).append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("} ");
        this.switchCases.forEach(switchCase => switchCase.catchToODialect(writer), this);
        if(this.defaultCase!=null) {
            writer.append("catch(any) {").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent().append("}");
        }
        if(this.alwaysInstructions!=null) {
            writer.append("finally {").newLine().indent();
            this.alwaysInstructions.toDialect(writer);
            writer.dedent().append("}");
        }
        writer.newLine();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("try ").append(this.errorId.name).append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        this.switchCases.forEach(switchCase => switchCase.catchToMDialect(writer), this);
        if(this.defaultCase!=null) {
            writer.append("except:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        if(this.alwaysInstructions!=null) {
            writer.append("finally:").newLine().indent();
            this.alwaysInstructions.toDialect(writer);
            writer.dedent();
        }
        writer.newLine();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("switch on ").append(this.errorId.name).append(" doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
        this.switchCases.forEach(switchCase => switchCase.catchToEDialect(writer), this);
        if(this.defaultCase!=null) {
            writer.append("when any:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        if(this.alwaysInstructions!=null) {
            writer.append("always:").newLine().indent();
            this.alwaysInstructions.toDialect(writer);
            writer.dedent();
        }
    }

    declare(transpiler: Transpiler): void {
        this.statements.declare(transpiler);
        const child = transpiler.newChildTranspiler();
        child.context.registerInstance(new ErrorVariable(this.errorId), true);
        this.declareSwitch(child);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("try {").indent();
        this.statements.transpile(transpiler);
        transpiler.dedent().append("} catch(").append(this.errorId.name).append(") {").indent();
        const child = transpiler.newChildTranspiler();
        child.context.registerInstance(new ErrorVariable(this.errorId), true);
        child.append("switch(translateError(").append(this.errorId.name).append(")) {").indent();
        this.switchCases.forEach(switchCase => switchCase.transpileError(child), this);
        if(this.defaultCase!=null) {
            child.append("default:").indent();
            this.defaultCase.transpile(child);
            child.dedent();
        }
        child.dedent().append("}");
        if(this.alwaysInstructions) {
            child.append(" finally {").indent();
            this.alwaysInstructions.transpile(child);
            child.dedent().append("}");
        }
        child.dedent().append("}");
        child.flush();
    }
}

