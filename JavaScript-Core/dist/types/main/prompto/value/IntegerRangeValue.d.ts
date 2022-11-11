import RangeValue from './RangeValue';
import { IntegerValue } from '../value';
import { Context } from "../runtime";
import IValue from "./IValue";
export default class IntegerRangeValue extends RangeValue<IntegerValue> {
    constructor(left: IntegerValue, right: IntegerValue);
    size(): number;
    hasItem(context: Context, value: IValue): boolean;
    getItem(index: number): IntegerValue;
    newInstance(left: IntegerValue, right: IntegerValue): IntegerRangeValue;
}
