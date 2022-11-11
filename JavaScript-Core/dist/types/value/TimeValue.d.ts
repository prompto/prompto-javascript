import BaseValue from "./BaseValue";
import { PeriodValue, TextValue, IValue } from './index';
import { Context } from "../runtime";
import { LocalTime } from "../intrinsic";
import { Identifier } from "../grammar";
import { JsonParent } from "../json";
export default class TimeValue extends BaseValue<LocalTime> {
    constructor(value: LocalTime);
    toString(): string;
    toJsonNode(): string;
    getStorableData(): any;
    getValue(): LocalTime;
    Add(context: Context, value: IValue): TimeValue;
    Subtract(context: Context, value: IValue): PeriodValue | TimeValue;
    compareToValue(context: Context, value: IValue): 1 | 0 | -1;
    GetMemberValue(context: Context, member: Identifier): IValue;
    cmp(obj: TimeValue): 1 | 0 | -1;
    equals(obj: any): boolean;
    toDocumentValue(context: Context): TextValue;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
