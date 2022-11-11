import RangeValue from "./RangeValue";
import { DateValue, IValue } from "./index";
import { Context } from "../runtime";
export default class DateRangeValue extends RangeValue<DateValue> {
    constructor(left: DateValue, right: DateValue);
    size(): number;
    hasItem(context: Context, value: IValue): boolean;
    getItem(index: number): DateValue;
    newInstance(first: DateValue, last: DateValue): RangeValue<DateValue>;
}
