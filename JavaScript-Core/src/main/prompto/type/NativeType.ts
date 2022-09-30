/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BaseType from './BaseType'
import {ArrowExpression, IExpression} from "../expression"
import {Context, Transpiler} from "../runtime";
import {AnyType, MissingType} from "./index";
import {TypeFamily} from "../store";
import {Identifier} from "../grammar";
import {IValue} from "../value";
import IType from "./IType";

export default abstract class NativeType extends BaseType {

    static all: NativeType[] | null = null;

    constructor(id: Identifier, family: TypeFamily) {
        super(id, family);
    }

    getSortedComparator(context: Context, desc: boolean, key: IExpression | null): (o1: IValue, o2: IValue) => number {
        if(key)
            return this.getExpressionSortedComparator(context, desc, key);
        else
            return this.getNativeSortedComparator(desc);
    }

    getExpressionSortedComparator(context: Context, desc: boolean, expression: IExpression): (o1: IValue, o2: IValue) => number {
        if(expression instanceof ArrowExpression)
            return expression.getSortedComparator(context, this, desc);
        else
            throw new Error("Not supported!");
    }

    getNativeSortedComparator(desc: boolean): (o1: IValue, o2: IValue) => number {
        if(desc)
            return (v1, v2) => {
                const o1 = v1.value;
                const o2 = v2.value;
                return o1 < o2 ? 1 : o1 == o2 ? 0 : -1;
            };
        else
            return (v1, v2) => {
                const o1 = v1.value;
                const o2 = v2.value;
                return o1 > o2 ? 1 : o1 == o2 ? 0 : -1;
            };
    }

    checkUnique(context: Context) {
        // nothing to do
    }

    checkExists(context: Context) {
        // nothing to do
    }

    isMoreSpecificThan(context: Context, other: IType): boolean {
        return  other == MissingType.instance || other == AnyType.instance;
    }

    equals(obj: any) {
        return obj==this;
    }

    declare(transpiler: Transpiler) {
        // nothing to do
    }

    transpile(transpiler: Transpiler) {
        // nothing to do
    }

    declareSorted(transpiler: Transpiler, key: IExpression) {
        // nothing to do
    }

    transpileSortedComparator(transpiler: Transpiler, key: IExpression, desc: boolean) {
        if(key instanceof ArrowExpression)
            return key.transpileSortedComparator(transpiler, this, desc);
        else if(desc)
            transpiler.append("function(o1, o2) { return o1 == o2 ? 0 : o1 > o2 ? -1 : 1; }");
    }
}




