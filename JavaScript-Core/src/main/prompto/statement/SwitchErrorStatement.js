import BaseSwitchStatement from './BaseSwitchStatement.js'
import { ArgumentList, Argument, Identifier } from '../grammar'
import { EnumeratedCategoryType, VoidType, CategoryType } from '../type'
import { ErrorVariable } from '../runtime'
import { ExecutionError } from '../error'
import { UnresolvedParameter } from '../param'
import { ConstructorExpression } from '../expression'
import { TextLiteral } from '../literal'
import {StatementList} from "../statement";

export default class SwitchErrorStatement extends BaseSwitchStatement {

    constructor(errorId, statements, handlers, anyStmts, alwaysStmts) {
        super(handlers, anyStmts);
        this.errorId = errorId;
        this.statements = statements || null;
        this.alwaysInstructions = alwaysStmts || null;
    }

    locateSectionAtLine(line) {
        let section;
        if(this.statements instanceof StatementList) {
            section = this.statements.locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        section = this.switchCases.locateSectionAtLine(line, false);
        if(section !== null)
            return section;
        if(this.defaultCase instanceof StatementList) {
            section = this.defaultCase.locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        if(this.alwaysInstructions instanceof StatementList)
            return this.alwaysInstructions.locateSectionAtLine(line);
        else
            return null;
    }

    checkSwitchCasesType(context) {
        const child = context.newChildContext();
        child.registerValue(new ErrorVariable(this.errorId));
        super.checkSwitchCasesType(child);
    }

    checkSwitchType(context) {
        return new EnumeratedCategoryType(new Identifier("Error"));
    }

    collectReturnTypes(context, types) {
        let type = this.statements.check(context, null);
        if(type !== VoidType.instance) {
            types[type.name] = type;
        }
        const child = context.newChildContext();
        child.registerValue(new ErrorVariable(this.errorId));
        const section = super.collectReturnTypes(child, types);
        if(this.alwaysInstructions!=null) {
            type = this.alwaysInstructions.check(context, null);
            if(type !== VoidType.instance) {
                types[type.name] = type;
            }
        }
        return section;
    }

    interpret(context: Context): Value {
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

    populateError(e, context) {
        let error = e.getExpression(context);
        if(error==null) {
            const args = new ArgumentList();
            args.add(new Argument(new UnresolvedParameter("name"), new TextLiteral(typeof(e))));
            args.add(new Argument(new UnresolvedParameter("text"), new TextLiteral(e.message)));
            error = new ConstructorExpression(new CategoryType("Error"), args, null);
        }
        if(context.getRegisteredValue(this.errorId)==null) {
            context.registerValue(new ErrorVariable(this.errorId));
        }
        if(error.interpret) {
            error = error.interpret(context);
        }
        context.setValue(this.errorId, error);
        return error;
    }

    toDialect(writer: CodeWriter): void {
        writer = writer.newLocalWriter();
        writer.context.registerValue(new ErrorVariable(this.errorId));
        super.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("try (").append(this.errorId.name).append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("} ");
        this.switchCases.forEach(switchCase => {
            switchCase.catchToODialect(writer);
        });
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
        this.switchCases.forEach(switchCase => {
            switchCase.catchToPDialect(writer);
        });
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
        this.switchCases.forEach(switchCase => {
            switchCase.catchToEDialect(writer);
        });
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
        child.context.registerValue(new ErrorVariable(this.errorId));
        this.declareSwitch(child);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("try {").indent();
        this.statements.transpile(transpiler);
        transpiler.dedent().append("} catch(").append(this.errorId.name).append(") {").indent();
        const child = transpiler.newChildTranspiler();
        child.context.registerValue(new ErrorVariable(this.errorId));
        child.append("switch(translateError(").append(this.errorId.name).append(")) {").indent();
        this.switchCases.forEach(switchCase => {
            switchCase.transpileError(child);
        }, this);
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
        return true;
    }
}

