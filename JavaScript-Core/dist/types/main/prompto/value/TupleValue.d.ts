import BaseValueList from './BaseValueList';
import IValue from "./IValue";
import { Context } from "../runtime";
export default class TupleValue extends BaseValueList<TupleValue> {
    constructor(mutable: boolean, items?: IValue[], item?: IValue);
    toString(): string;
    Add(context: Context, value: IValue): TupleValue;
    filter(filter: (value: IValue) => boolean): TupleValue;
    newInstance(items: IValue[]): TupleValue;
}
