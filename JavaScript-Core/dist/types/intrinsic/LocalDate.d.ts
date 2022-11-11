import {DateTime, LocalTime, Period} from "./index";

export default class LocalDate {

    static parse(s: string): LocalDate;

    constructor(value: Date | number);
    toString(): string
    equals(obj: any): boolean;
    getYear(): number;
    getMonth(): number;
    getDayOfMonth(): number;
    getDayOfYear(): number;
    getUTCDate(): number;
    addPeriod(value: Period): LocalDate;
    subtractPeriod(value: Period): LocalDate;
    addTime(value: LocalTime): DateTime;
    subtractDate(value: LocalDate): Period;
    valueOf(): number;

}
