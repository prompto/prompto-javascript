import Container from './Container';
import { IValue, IntegerValue } from './index';
import { ContainerType } from "../type";
import { Context } from "../runtime";
import { Identifier } from "../grammar";
import { IIterator } from "../intrinsic";
export default abstract class BaseValueList<T extends BaseValueList<T>> extends Container<IValue[]> {
    constructor(type: ContainerType, mutable: boolean, items?: IValue[], item?: IValue);
    abstract newInstance(items: IValue[]): T;
    get items(): IValue[];
    toString(): string;
    add(o: IValue): void;
    setItem(index: number, value: IValue): void;
    setItemInContext(context: Context, index: IValue, value: IValue): void;
    get(index: number): IValue;
    size(): number;
    isEmpty(): boolean;
    slice(fi: IntegerValue, li: IntegerValue): T;
    checkFirst(fi: IntegerValue | null): number;
    checkLast(li: IntegerValue | null): number;
    hasValue(context: Context, value: IValue): boolean;
    getItemInContext(context: Context, index: IValue): IValue | null;
    equals(obj: any): boolean;
    GetMemberValue(context: Context, member: Identifier): IValue;
    getIterator(context: Context): IIterator<IValue>;
}
