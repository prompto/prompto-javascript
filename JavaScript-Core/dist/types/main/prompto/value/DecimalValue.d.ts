import BaseValue from "./BaseValue";
import IValue from "./IValue";
import { Context } from "../runtime";
import { JsonParent } from "../json";
export default class DecimalValue extends BaseValue<number> {
    static Parse(text: string): DecimalValue;
    constructor(value: number);
    toString(): string;
    toJsonNode(): number;
    convertToJavaScript(): number;
    IntegerValue(): number;
    DecimalValue(): number;
    getStorableData(): number;
    Add(context: Context, value: IValue): IValue;
    Subtract(context: Context, value: IValue): IValue;
    Multiply(context: Context, value: IValue): IValue;
    Divide(context: Context, value: IValue): IValue;
    IntDivide(context: Context, value: IValue): IValue;
    Modulo(context: Context, value: IValue): IValue;
    Minus(context: Context): IValue;
    compareToValue(context: Context, value: IValue): number;
    equals(obj: any): boolean;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
