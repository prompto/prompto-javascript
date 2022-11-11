import EnumSymbol from './EnumSymbol';
import { IValue } from '../value';
import { Identifier } from "../grammar";
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { EnumeratedNativeType, IType } from "../type";
export default class NativeSymbol extends EnumSymbol<EnumeratedNativeType> {
    expression: IExpression;
    constructor(id: Identifier, expression: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    initialize(transpiler: Transpiler): void;
    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean): IValue;
}
