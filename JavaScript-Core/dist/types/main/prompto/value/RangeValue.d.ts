import BaseValue from './BaseValue';
import { IValue, IntegerValue } from '../value';
import { IType } from '../type';
import { Identifier } from "../grammar";
import { Context } from "../runtime";
import { IIterable, IIterator } from "../intrinsic";
export interface Limits<T extends IValue> {
    low: T;
    high: T;
}
export default abstract class RangeValue<T extends IValue> extends BaseValue<Limits<T>> implements IIterable<T> {
    constructor(itemType: IType, low: T, high: T);
    get low(): T;
    get high(): T;
    GetMemberValue(context: Context, id: Identifier): IValue;
    toString(): string;
    equals(obj: any): boolean;
    abstract newInstance(first: T, last: T): RangeValue<T>;
    abstract hasItem(context: Context, lval: IValue): boolean;
    abstract getItem(item: number): T | null;
    abstract size(): number;
    GetItemValue(context: Context, index: IValue): IValue;
    slice(fi: IntegerValue | null, li: IntegerValue | null): RangeValue<T>;
    checkFirst(fi: IntegerValue | null, size: number): number;
    checkLast(li: IntegerValue | null, size: number): number;
    getIterator(): IIterator<T>;
}
