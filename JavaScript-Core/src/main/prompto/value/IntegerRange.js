import RangeValue from "./RangeValue"
import { IntegerValue } from "./index"
import { IntegerType } from "../type/index"
import { IndexOutOfRangeError } from "../error/index"

export default class IntegerRange extends RangeValue {

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
        return new IntegerRange(left, right);
    }
}
