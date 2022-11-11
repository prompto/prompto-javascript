import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IValue } from '../value';
import { Context, Transpiler } from "../runtime";
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
export default class MutableExpression extends BaseExpression {
    source: IExpression;
    constructor(source: IExpression);
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
}
