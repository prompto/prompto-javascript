import BaseValue from "./BaseValue";
import { PeriodValue, DateTimeValue, TextValue, IValue } from './index';
import { LocalDate } from "../intrinsic";
import { Context } from "../runtime";
import { Identifier } from "../grammar";
import { JsonParent } from "../json";
export default class DateValue extends BaseValue<LocalDate> {
    constructor(value: LocalDate);
    toString(): string;
    toJsonNode(): string;
    getStorableData(): any;
    getValue(): LocalDate;
    convertToJavaScript(): LocalDate;
    Add(context: Context, value: IValue): DateValue | DateTimeValue;
    Subtract(context: Context, value: IValue): DateValue | PeriodValue;
    compareToValue(context: Context, value: IValue): 1 | 0 | -1;
    cmp(value: DateValue | DateTimeValue): 1 | 0 | -1;
    GetMemberValue(context: Context, member: Identifier): IValue;
    equals(obj: any): boolean;
    toDocumentValue(context: Context): TextValue;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
