import ContainerType from './ContainerType';
import IType from "./IType";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import { IExpression } from "../expression";
export default class RangeType extends ContainerType {
    constructor(itemType: IType);
    withItemType(itemType: IType): RangeType;
    checkItem(context: Context, section: Section, other: IType): IType;
    declareItem(transpiler: Transpiler, itemType: IType): void;
    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void;
    checkSlice(context: Context, section: Section): IType;
    declareSlice(transpiler: Transpiler, first: IExpression, last: IExpression): void;
    transpileSlice(transpiler: Transpiler, first: IExpression, last: IExpression): void;
    checkIterator(context: Context, section: Section, source: IExpression): IType;
    checkHasAllOrAny(context: Context, section: Section, other: IType): IType;
    declareContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void;
    transpileContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void;
    declareHasAllOrAny(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;
    transpileHasAllValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;
    transpileHasAnyValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;
}
