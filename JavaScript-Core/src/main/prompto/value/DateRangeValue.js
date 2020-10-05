import RangeValue from "./RangeValue.js"
import { DateType } from "../type/index.js"
import { IndexOutOfRangeError } from "../error/index.js"
import { DateValue } from "../value/index.js"
import { LocalDate } from "../intrinsic/index.js"

export default class DateRangeValue extends RangeValue {

    constructor(left, right) {
        super(DateType.instance, left, right);
    }

    size() {
        const h = this.high.value.valueOf();
        const l = this.low.value.valueOf();
        return 1 + ( (h-l)/(24*60*60*1000));
    }

    getItem(index) {
        const millis = this.low.value.valueOf() + (index-1)*(24*60*60*1000);
        if(millis>this.high.value.valueOf()) {
            throw new IndexOutOfRangeError();
        } else {
            return new DateValue(new LocalDate(millis));
        }
    }
}

