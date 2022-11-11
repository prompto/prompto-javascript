import BaseValue from './BaseValue';
import { IValue, ListValue } from './index';
import { IType } from '../type';
import { Context } from '../runtime';
import { IExpression } from "../expression";
import { Identifier } from "../grammar";
import IValueIterableWithCounts from "./IValueIterableWithCounts";
export default class IterableValue extends BaseValue<IValueIterableWithCounts> implements IValueIterableWithCounts {
    context: Context;
    name: Identifier;
    sourceType: IType;
    expression: IExpression;
    constructor(context: Context, name: Identifier, sourceType: IType, iterable: IValueIterableWithCounts, expression: IExpression, resultType: IType);
    isEmpty(): boolean;
    length(): number;
    get count(): number;
    get totalCount(): number;
    getIterator(context: Context): {
        hasNext: () => boolean;
        next: () => IValue;
    };
    GetMemberValue(context: Context, member: Identifier): IValue;
    filter(filter: (o: IValue) => boolean): ListValue;
    toString(): string;
    toListValue(): ListValue;
    toSetValue(): import("./SetValue").default;
}
