import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IValue } from '../value';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { Identifier } from "../grammar";
export default class TypeExpression extends BaseExpression {
    value: IType;
    constructor(value: IType);
    toDialect(writer: CodeWriter): void;
    toString(): string;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    getMemberValue(context: Context, member: Identifier): IValue;
}
