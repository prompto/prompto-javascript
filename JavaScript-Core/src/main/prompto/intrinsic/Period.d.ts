export default class Period {

    equals(value: any): boolean;
    totalMilliseconds(): number;
    minus(): Period;
    add(value: Period): Period;
    subtract(value: Period): Period;
    multiply(value: number): Period;

 }
