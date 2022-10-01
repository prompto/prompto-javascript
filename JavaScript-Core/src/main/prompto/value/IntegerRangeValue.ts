import RangeValue from './RangeValue'
import { IntegerValue } from '../value'
import { IntegerType } from '../type'
import { IndexOutOfRangeError } from '../error'
import {Context} from "../runtime";
import IValue from "./IValue";

export default class IntegerRangeValue extends RangeValue<IntegerValue> {

    constructor(left: IntegerValue, right: IntegerValue) {
        super(IntegerType.instance, left, right);
    }

    size(): number {
        return 1 + this.high.IntegerValue() - this.low.IntegerValue();
    }

    hasItem(context: Context, value: IValue): boolean {
        if(value instanceof IntegerValue) {
            const item = value.IntegerValue();
            return item >= this.value.low.IntegerValue() && item <= this.value.high.IntegerValue();
        } else
            return false;
    }

    getItem(index: number) {
        const result = this.value.low.IntegerValue() + index - 1;
        if(result > this.value.high.IntegerValue()) {
            throw new IndexOutOfRangeError();
        }
        return new IntegerValue(result);
    }

    newInstance(left: IntegerValue, right: IntegerValue) {
        return new IntegerRangeValue(left, right);
    }


}
