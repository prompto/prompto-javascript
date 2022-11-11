import BaseExpression from './BaseExpression';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IType } from "../type";
import { IValue } from "../value";
export default class MultiplyExpression extends BaseExpression {
    left: IExpression;
    right: IExpression;
    constructor(left: IExpression, right: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
