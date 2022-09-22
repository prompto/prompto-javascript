import BaseExpression from '../../../main/prompto/expression/BaseExpression.ts'
import { CodeValue } from '../value'
import { SyntaxError, PromptoError } from '../error'

export default class ExecuteExpression extends BaseExpression {

    constructor(id) {
        super();
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return "execute: " + this.name;
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("execute: ");
        writer.append(this.name);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("execute(");
        writer.append(this.name);
        writer.append(")");
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }

    check(context: Context): Type {
        try {
            const value = context.getValue(this.id);
            if(value instanceof CodeValue) {
                return value.checkCode(context);
            } else {
                throw new SyntaxError("Expected code, got:" + value.toString());
            }
        } catch(e) {
            if(e instanceof PromptoError) {
                throw new SyntaxError(e.message);
            }
        }
    }

    interpret(context: Context): Value {
        const value = context.getValue(this.id);
        if(value instanceof CodeValue) {
            return value.interpret(context);
        } else {
            throw new SyntaxError("Expected code, got:" + value.toString());
        }
    }

    declare(transpiler: Transpiler): void {
        const value = transpiler.context.getValue(this.id);
        value.declareCode(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(");
        const value = transpiler.context.getValue(this.id);
        value.transpileCode(transpiler);
        transpiler.append(")");
    }
}

