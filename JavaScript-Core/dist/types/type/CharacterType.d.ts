import NativeType from './NativeType';
import { CmpOp, Identifier } from '../grammar';
import { CharacterValue, IValue } from '../value';
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import IType from "./IType";
import { IExpression } from "../expression";
export default class CharacterType extends NativeType {
    static instance: CharacterType;
    constructor();
    nativeCast(context: Context, value: IValue): CharacterValue;
    checkMember(context: Context, section: Section, id: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, id: Identifier): void;
    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType;
    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType;
    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    checkCompare(context: Context, section: Section, other: IType): IType;
    declareCompare(transpiler: Transpiler, other: IType): void;
    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void;
    checkRange(context: Context, section: Section, other: IType): IType;
    declareRange(transpiler: Transpiler, other: IType): void;
    transpileRange(transpiler: Transpiler, itemType: IType, first: IExpression, last: IExpression): void;
    newRange(left: IValue, right: IValue): IValue;
}
