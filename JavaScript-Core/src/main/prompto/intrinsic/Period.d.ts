export default class Period {

    static parse(s: string): Period;

    equals(value: any): boolean;
    totalMilliseconds(): number;
    minus(): Period;
    add(value: Period): Period;
    subtract(value: Period): Period;
    multiply(value: number): Period;

}
