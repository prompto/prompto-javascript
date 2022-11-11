import BaseValue from './BaseValue';
import { ListValue, IValue } from './index';
import { CategoryType, IType } from '../type';
import { Identifier } from '../grammar';
import { Context } from "../runtime";
import { IStored } from "../store";
import IValueIterableWithCounts from "./IValueIterableWithCounts";
import { Cursor, IIterator } from "../intrinsic";
export default class CursorValue extends BaseValue<Cursor<IStored>> implements IValueIterableWithCounts {
    context: Context;
    itemType: IType;
    constructor(context: Context, itemType: IType, cursor: Cursor<IStored>);
    isEmpty(): boolean;
    get count(): number;
    get totalCount(): number;
    toString(): string;
    getIterator(context: Context): IIterator<IValue>;
    readItemType(stored: IStored): CategoryType;
    GetMemberValue(context: Context, member: Identifier): IValue;
    filter(filter: (o: IValue) => boolean): ListValue;
    toListValue(): ListValue;
    toSetValue(): import("./SetValue").default;
}
