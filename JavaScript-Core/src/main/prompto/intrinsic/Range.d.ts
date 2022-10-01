import {LocalDate, LocalTime} from "./index";

export class Range<K> {

    constructor(first: K, last: K);
    toString(): string;
    getText(): string;

}

export class CharacterRange extends Range<string> {

}

export class IntegerRange extends Range<number> {

}

export class DateRange extends Range<LocalDate> {

}

export class TimeRange extends Range<LocalTime> {

}
