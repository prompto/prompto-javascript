import RangeValue from "./RangeValue"
import { TimeType } from "../type"
import { IndexOutOfRangeError } from "../error"
import {IValue, TimeValue} from "./index"
import { LocalTime } from "../intrinsic"
import {Context} from "../runtime";

export default class TimeRangeValue extends RangeValue<TimeValue> {

    constructor(left: TimeValue, right: TimeValue) {
        super(TimeType.instance, left, right);
    }

    size() {
        return 1 + (this.high.value.valueOf() - this.low.value.valueOf())/1000;
    }

    hasItem(context: Context, value: IValue): boolean {
        if(value instanceof TimeValue) {
            const millis = value.value.valueOf();
            return millis >= this.low.value.valueOf() && millis <= this.high.value.valueOf();
        } else
            return false;
    }

    getItem(index: number) {
        const result = this.low.value.valueOf() + (index-1)*1000;
        if(result>this.high.value.valueOf()) {
            throw new IndexOutOfRangeError();
        }
        return new TimeValue(new LocalTime(result));
    }

    newInstance(first: TimeValue, last: TimeValue): RangeValue<TimeValue> {
        return new TimeRangeValue(first, last);
    }
}

