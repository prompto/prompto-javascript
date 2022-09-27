import RangeValue from './RangeValue'
import { IntegerValue } from '../value'
import { IntegerType } from '../type'
import { IndexOutOfRangeError } from '../error'

export default class IntegerRangeValue extends RangeValue<IntegerValue> {

    constructor(left: IntegerValue, right: IntegerValue) {
        super(IntegerType.instance, left, right);
    }

    size(): number {
        return 1 + this.high.IntegerValue() - this.low.IntegerValue();
    }

    getItem(index) {
        const result = this.low.IntegerValue() + index - 1;
        if(result > this.high.IntegerValue()) {
            throw new IndexOutOfRangeError();
        }
        return new IntegerValue(result);
    }

    newInstance(left, right) {
        return new IntegerRangeValue(left, right);
    }
}
