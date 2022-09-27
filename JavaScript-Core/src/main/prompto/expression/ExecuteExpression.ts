import BaseExpression from './BaseExpression'
import {CodeValue, IValue} from '../value'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";

export default class ExecuteExpression extends BaseExpression {

    id: Identifier;

    constructor(id: Identifier) {
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

    check(context: Context): IType {
        const value = this.getCodeValue(context);
        return value.check(context);
    }

    interpret(context: Context): IValue {
        const value = this.getCodeValue(context);
        return value.interpret(context);
    }

    declare(transpiler: Transpiler): void {
        const value = this.getCodeValue(transpiler.context);
        value.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(");
        const value = this.getCodeValue(transpiler.context);
        value.transpile(transpiler);
        transpiler.append(")");
    }

    private getCodeValue(context: Context) {
        const value = context.getValue(this.id);
        if(value instanceof CodeValue) {
            return value;
        } else if (value) {
            throw new SyntaxError("Expected code, got:" + value.toString());
        } else
            throw new SyntaxError("Missing code value for " + this.name);

    }
}

