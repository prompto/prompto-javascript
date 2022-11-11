import BaseValue from "./BaseValue";
import { IValue } from './index';
import { Context } from "../runtime";
import { JsonParent } from "../json";
export default class IntegerValue extends BaseValue<number> {
    static Parse(text: string): IntegerValue;
    constructor(value: number);
    toString(): string;
    toJsonNode(): number;
    getStorableData(): number;
    convertToJavaScript(): number;
    IntegerValue(): number;
    DecimalValue(): number;
    Add(context: Context, value: IValue): IValue;
    Subtract(context: Context, value: IValue): IValue;
    Multiply(context: Context, value: IValue): IValue;
    Divide(context: Context, value: IValue): IValue;
    IntDivide(context: Context, value: IValue): IValue;
    Modulo(context: Context, value: IValue): IValue;
    Minus(context: Context): IValue;
    cmp(obj: IntegerValue): 1 | 0 | -1;
    compareToValue(context: Context, value: IValue): 1 | 0 | -1;
    equals(obj: any): boolean;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
