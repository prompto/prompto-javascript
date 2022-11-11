import BaseValue from "./BaseValue";
import { PeriodValue, TextValue, IValue } from './index';
import { DateTime } from "../intrinsic";
import { Context } from "../runtime";
import { Identifier } from "../grammar";
import { JsonParent } from "../json";
export default class DateTimeValue extends BaseValue<DateTime> {
    constructor(value: DateTime);
    getStorableData(): any;
    convertToJavaScript(): DateTime;
    toString(): string;
    toJsonNode(): string;
    Add(context: Context, value: IValue): DateTimeValue;
    Subtract(context: Context, value: IValue): PeriodValue | DateTimeValue;
    compareToValue(context: Context, value: IValue): number;
    GetMemberValue(context: Context, member: Identifier): IValue;
    equals(obj: any): boolean;
    toDocumentValue(context: Context): TextValue;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
