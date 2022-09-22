import RangeValue from './RangeValue.js'
import { IntegerValue } from '../value'
import { IntegerType } from '../type'
import { IndexOutOfRangeError } from '../error'

export default class IntegerRangeValue extends RangeValue {

    constructor(left, right) {
        super(IntegerType.instance, left, right);
    }

    size() {
        return 1 + this.high.IntegerValue() - this.low.IntegerValue();
    }

    getItem(index) {
        const result = this.low.IntegerValue() + index - 1;
        if(result>this.high.IntegerValue()) {
            throw new IndexOutOfRangeError();
        }
        return new IntegerValue(result);
    }

    newInstance(left, right) {
        return new IntegerRangeValue(left, right);
    }
}
