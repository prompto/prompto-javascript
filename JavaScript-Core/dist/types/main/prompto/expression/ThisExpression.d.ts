import BaseExpression from './BaseExpression';
import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class ThisExpression extends BaseExpression {
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
    toString(): string;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
