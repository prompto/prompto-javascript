import BaseValue from "./BaseValue";
import { IValue } from './index';
import { Period } from "../intrinsic";
import { Context } from "../runtime";
import { Identifier } from "../grammar";
export default class PeriodValue extends BaseValue<Period> {
    constructor(value: Period);
    toJsonNode(): string;
    totalMilliseconds(): number;
    convertToJavaScript(): Period;
    Add(context: Context, value: IValue): IValue;
    Minus(context: Context): IValue;
    Subtract(context: Context, value: IValue): IValue;
    Multiply(context: Context, value: IValue): IValue;
    toString(): string;
    equals(obj: any): boolean;
    GetMemberValue(context: Context, member: Identifier): IValue;
    toDocumentValue(context: Context): IValue;
}
