import BaseValueList from './BaseValueList';
import { SetValue, IntegerValue, IValue } from './index';
import { IType } from '../type';
import { IStorable } from "../store";
import { Context } from "../runtime";
export default class ListValue extends BaseValueList<ListValue> {
    constructor(itemType: IType, mutable?: boolean, items?: IValue[], item?: IValue);
    newInstance(items: IValue[]): ListValue;
    getStorableData(): any;
    collectStorables(storables: Set<IStorable>): void;
    convertToJavaScript(): any;
    Add(context: Context, value: IValue): IValue;
    Subtract(context: Context, value: IValue): IValue;
    removeItem(item: IntegerValue): void;
    removeValue(value: IValue): void;
    addValue(value: IValue): void;
    insertValue(value: IValue, atIndex: IntegerValue): void;
    indexOfValue(value: IValue): IValue;
    findIndex(value: IValue): number;
    Multiply(context: Context, value: IValue): IValue;
    filter(filter: (value: IValue) => boolean): ListValue;
    toSetValue(): SetValue;
    toJsonNode(): import("../json").JsonNode[];
}
