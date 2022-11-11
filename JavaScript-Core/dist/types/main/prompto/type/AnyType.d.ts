import NativeType from './NativeType';
import { Identifier } from '../grammar';
import { Context, Transpiler } from "../runtime";
import IType from "./IType";
import { Section } from "../parser";
import { IExpression } from "../expression";
export default class AnyType extends NativeType {
    static instance: AnyType;
    constructor();
    isAssignableFrom(context: Context, other: IType): boolean;
    checkItem(context: Context, section: Section, item: IType): IType;
    checkMember(context: Context, section: Section, member: Identifier): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareItem(transpiler: Transpiler, type: IType, item: IExpression): void;
    transpileItem(transpiler: Transpiler, type: IType, item: IExpression): void;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;
    transpileAssignMemberValue(transpiler: Transpiler, member: Identifier, expression: IExpression): void;
    transpileAssignItemValue(transpiler: Transpiler, item: IExpression, expression: IExpression): void;
}
