import BaseType from './BaseType';
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import { TypeFamily } from "../store";
import { Identifier } from "../grammar";
import { IValue } from "../value";
import IType from "./IType";
export default abstract class NativeType extends BaseType {
    static all: NativeType[] | null;
    constructor(id: Identifier, family: TypeFamily);
    getSortedComparator(context: Context, desc: boolean, key: IExpression | null): (o1: IValue, o2: IValue) => number;
    getExpressionSortedComparator(context: Context, desc: boolean, expression: IExpression): (o1: IValue, o2: IValue) => number;
    getNativeSortedComparator(desc: boolean): (o1: IValue, o2: IValue) => number;
    checkUnique(context: Context): void;
    checkExists(context: Context): void;
    isMoreSpecificThan(context: Context, other: IType): boolean;
    equals(obj: any): boolean;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareSorted(transpiler: Transpiler, key: IExpression): void;
    transpileSortedComparator(transpiler: Transpiler, key: IExpression, desc: boolean): void;
}
