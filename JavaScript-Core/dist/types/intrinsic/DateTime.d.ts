import {LocalDate, LocalTime, Period} from "./index";

export default class DateTime {

    static parse(s: string): DateTime;
    static now(): DateTime;
    static fromDateAndTime(date: LocalDate, time: LocalTime | null): DateTime;

    date: Date;
    tzOffset: number;

    constructor(date: Date, tzOffset: number);
    toString(): string
    getYear(): number;
    getMonth(): number;
    getDayOfMonth(): number;
    getDayOfYear(): number;
    getHour(): number;
    getMinute(): number;
    getSecond(): number;
    getMillisecond(): number;
    getTzOffset(): number;
    getTzName(): string;
    getDate(): LocalDate;
    getTime(): LocalTime;
    addPeriod(value: Period): DateTime;
    subtractPeriod(value: Period): DateTime;
    subtractDateTime(value: DateTime): Period;
    compareTo(date: Date | LocalDate, tzOffset: number): number;


}
