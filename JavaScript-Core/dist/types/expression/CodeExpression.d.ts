import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IValue } from '../value';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class CodeExpression extends BaseExpression {
    expression: IExpression;
    constructor(expression: IExpression);
    toString(): string;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    checkCode(context: Context): IType;
    interpretCode(context: Context): IValue;
    declareCode(transpiler: Transpiler): void;
    transpileCode(transpiler: Transpiler): void;
}
