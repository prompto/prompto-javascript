import RangeValue from "./RangeValue"
import { DateType } from "../type"
import { IndexOutOfRangeError } from "../error"
import {DateValue, IValue} from "./index"
import { LocalDate } from "../intrinsic"
import {Context} from "../runtime";

export default class DateRangeValue extends RangeValue<DateValue> {

    constructor(left: DateValue, right: DateValue) {
        super(DateType.instance, left, right);
    }

    size() {
        const h = this.high.value.valueOf();
        const l = this.low.value.valueOf();
        return 1 + ( (h-l)/(24*60*60*1000));
    }

    hasItem(context: Context, value: IValue): boolean {
        if(value instanceof DateValue) {
            const millis = value.value.valueOf();
            return millis >= this.low.value.valueOf() && millis <= this.high.value.valueOf();
        } else
            return false;
    }

    getItem(index: number) {
        const millis = this.low.value.valueOf() + (index-1)*(24*60*60*1000);
        if(millis > this.high.value.valueOf()) {
            throw new IndexOutOfRangeError();
        } else {
            return new DateValue(new LocalDate(millis));
        }
    }

    newInstance(first: DateValue, last: DateValue): RangeValue<DateValue> {
        return new DateRangeValue(first, last);
    }
}

