import BaseStatement from './BaseStatement'
import {BooleanType, IType, VoidType} from '../type'
import {BooleanValue, IValue} from '../value'
import {BreakResult, Context, Transpiler} from '../runtime'
import { InvalidDataError } from '../error'
import {Section} from "../parser";
import {StatementList} from "../statement";
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";

export default class WhileStatement extends BaseStatement {

    condition: IExpression;
    statements: StatementList | null;

    constructor(condition: IExpression, statements: StatementList | null) {
        super();
        this.condition = condition;
        this.statements = statements;
    }

    locateSectionAtLine(line: number) {
        if(this.condition instanceof Section) {
            const section = this.condition.locateSectionAtLine(line);
            if(section != null)
                return section;
        }
        if(this.statements)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    declare(transpiler: Transpiler): void {
        this.condition.declare(transpiler);
        transpiler = transpiler.newChildTranspiler();
        this.statements && this.statements.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("while(");
        this.condition.transpile(transpiler);
        transpiler.append(") {");
        transpiler.indent();
        const child = transpiler.newChildTranspiler();
        this.statements && this.statements.transpile(child);
        child.dedent().flush();
        transpiler.append("}").newLine();
    }

    check(context: Context): IType {
        const cond = this.condition.check(context);
        if(cond != BooleanType.instance) {
            context.problemListener.reportError(this, "Expected a Boolean condition!");
        }
        const child = context.newChildContext();
        return this.statements ? this.statements.check(child, null) : VoidType.instance;
    }

    interpretStatement(context: Context): IValue | null {
        while(this.interpretCondition(context)) {
            const child = context.newChildContext();
            const value = this.statements ? this.statements.interpret(child) : null;
            if(value == BreakResult.instance)
                break;
            if(value!=null)
                return value;
        }
        return null;
    }

    interpretCondition(context: Context) {
        const value = this.condition.interpretExpression(context);
        if(!(value instanceof BooleanValue)) {
            throw new InvalidDataError("Expected a Boolean, got:" + typeof(value));
        }
        return value.value;
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toMDialect(writer: CodeWriter): void {
        this.toEDialect(writer);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("while ");
        this.condition.toDialect(writer);
        writer.append(" :").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("while (");
        this.condition.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    canReturn() {
        return true;
    }

}

