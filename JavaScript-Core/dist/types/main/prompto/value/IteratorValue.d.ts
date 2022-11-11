import BaseValue from './BaseValue';
import { IType } from '../type';
import { IValue, ListValue } from "./index";
import { IIterator } from "../intrinsic";
export default class IteratorValue extends BaseValue<IIterator<IValue>> {
    constructor(itemType: IType, iterator: IIterator<IValue>);
    hasNext(): boolean;
    next(): IValue;
    toListValue(): ListValue;
    toSetValue(): import("./SetValue").default;
}
