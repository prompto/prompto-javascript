import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IValue } from '../value';
import { Context, Transpiler } from '../runtime';
import IExpression from "./IExpression";
import { CodeWriter } from "../utils";
import { IMethodDeclaration } from "../declaration";
export default class MethodExpression extends BaseExpression {
    expression: IExpression;
    constructor(expression: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    getDeclaration(context: Context): IMethodDeclaration | null;
    interpretExpression(context: Context, asMethod?: boolean): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
