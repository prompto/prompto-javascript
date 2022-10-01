import {Period} from "./index";

export default class LocalTime {

    static parse(s: string): LocalTime;

    constructor(value: Date | number);
    toString(): string
    getHour(): number;
    getMinute(): number;
    getSecond(): number;
    getMillisecond(): number;
    addPeriod(value: Period): LocalTime;
    subtractPeriod(value: Period): LocalTime;
    subtractTime(value: LocalTime): Period;
    valueOf(): number;

}
