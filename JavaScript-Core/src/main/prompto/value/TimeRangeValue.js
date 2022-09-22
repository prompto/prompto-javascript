import RangeValue from "./RangeValue.js"
import { TimeType } from "../type"
import { IndexOutOfRangeError } from "../error"
import { TimeValue } from "./index.ts"
import { LocalTime } from "../intrinsic"

export default class TimeRangeValue extends RangeValue {

    constructor(left, right) {
        super(TimeType.instance, left, right);
    }

    size() {
        return 1 + (this.high.value.valueOf() - this.low.value.valueOf())/1000;
    }

    compare(o1, o2) {
        return o1.cmp(o2);
    }

    getItem(index) {
        const result = this.low.value.valueOf() + (index-1)*1000;
        if(result>this.high.value.valueOf()) {
            throw new IndexOutOfRangeError();
        }
        return new TimeValue(new LocalTime(result));
    }
}

