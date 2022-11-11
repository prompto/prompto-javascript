import RangeValue from "./RangeValue";
import { IValue, TimeValue } from "./index";
import { Context } from "../runtime";
export default class TimeRangeValue extends RangeValue<TimeValue> {
    constructor(left: TimeValue, right: TimeValue);
    size(): number;
    hasItem(context: Context, value: IValue): boolean;
    getItem(index: number): TimeValue;
    newInstance(first: TimeValue, last: TimeValue): RangeValue<TimeValue>;
}
