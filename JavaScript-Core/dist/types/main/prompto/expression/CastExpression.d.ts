import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IValue } from '../value';
import { Context, Transpiler } from '../runtime';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
export default class CastExpression extends BaseExpression {
    expression: IExpression;
    type: IType;
    mutable: boolean;
    constructor(expression: IExpression, type: IType, mutable: boolean);
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
