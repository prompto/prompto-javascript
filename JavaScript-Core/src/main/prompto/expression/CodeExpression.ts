import BaseExpression from './BaseExpression'
import {CodeType, Type} from '../type'
import {CodeValue, Value} from '../value'
import {Expression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";

export default class CodeExpression extends BaseExpression {

    expression: Expression;

    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }

    toString(): string {
        return "Code: " + this.expression.toString();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("Code: ");
        this.expression.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("Code(");
        this.expression.toDialect(writer);
        writer.append(")");
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }

    check(context: Context): Type {
        return CodeType.instance;
    }

    interpret(context: Context): Value {
        return new CodeValue(this);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        // nothing to do
    }

    // expression can only be checked and evaluated in the context of an execute:
    checkCode(context: Context): Type {
        return this.expression.check(context);
    }

    interpretCode(context: Context): Value | null {
        return this.expression.interpret(context);
    }

    declareCode(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpileCode(transpiler: Transpiler): void {
        this.expression.transpile(transpiler);
    }
}

