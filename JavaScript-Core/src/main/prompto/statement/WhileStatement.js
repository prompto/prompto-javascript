import BaseStatement from './BaseStatement.ts'
import { BooleanType } from '../type'
import { BooleanValue } from '../value'
import { BreakResult } from '../runtime'
import { InvalidDataError } from '../error'
import {Section} from "../parser";
import {StatementList} from "../statement";

export default class WhileStatement extends BaseStatement {
   
    constructor(condition, statements) {
        super();
        this.condition = condition;
        this.statements = statements;
    }

    locateSectionAtLine(line) {
        if(this.condition instanceof Section) {
            const section = this.condition.locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    declare(transpiler: Transpiler): void {
        this.condition.declare(transpiler);
        transpiler = transpiler.newChildTranspiler();
        this.statements.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("while(");
        this.condition.transpile(transpiler);
        transpiler.append(") {");
        transpiler.indent();
        const child = transpiler.newChildTranspiler();
        this.statements.transpile(child);
        child.dedent().flush();
        transpiler.append("}").newLine();
        return true;
    }

    check(context: Context): IType {
        const cond = this.condition.check(context);
        if(cond !== BooleanType.instance) {
            context.problemListener.reportError(this, "Expected a Boolean condition!");
        }
        const child = context.newChildContext();
        return this.statements.check(child, null);
    }

    interpret(context: Context): IValue {
        while(this.interpretCondition(context)) {
            const child = context.newChildContext();
            const value = this.statements.interpret(child);
            if(value === BreakResult.instance)
                break;
            if(value!=null)
                return value;
        }
        return null;
    }

    interpretCondition(context) {
        const value = this.condition.interpret(context);
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
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        writer.append("while (");
        this.condition.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    canReturn() {
        return true;
    }

}

