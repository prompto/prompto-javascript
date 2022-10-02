import BaseExpression from './BaseExpression'
import {CodeType, IType} from '../type'
import {CodeValue, IValue} from '../value'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";

export default class CodeExpression extends BaseExpression {

    expression: IExpression;

    constructor(expression: IExpression) {
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

    check(context: Context): IType {
        return CodeType.instance;
    }

    interpretExpression(context: Context): IValue {
        return new CodeValue(this);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        // nothing to do
    }

    // expression can only be checked and evaluated in the context of an execute:
    checkCode(context: Context): IType {
        return this.expression.check(context);
    }

    interpretCode(context: Context): IValue {
        return this.expression.interpretExpression(context);
    }

    declareCode(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpileCode(transpiler: Transpiler): void {
        this.expression.transpile(transpiler);
    }
}

