import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IValue } from '../value';
import { CodeWriter } from '../utils';
import { IExpression } from "./index";
import { Context, Transpiler } from "../runtime";
export default class BlobExpression extends BaseExpression {
    source: IExpression;
    constructor(source: IExpression);
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    static collectDatas(context: Context, value: IValue): Map<string, never>;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
}
