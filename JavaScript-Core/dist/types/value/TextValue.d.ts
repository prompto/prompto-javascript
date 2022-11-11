import BaseValue from './BaseValue';
import { IntegerValue, CharacterValue } from '../value';
import { Context } from "../runtime";
import IValue from "./IValue";
import { Identifier } from "../grammar";
import { JsonParent } from "../json";
import { IIterator } from "../intrinsic";
export default class TextValue extends BaseValue<string> {
    constructor(value: string);
    getStorableData(): string;
    toString(): string;
    toJsonNode(): string;
    Add(context: Context, value: IValue): IValue;
    Multiply(context: Context, value: IValue): IValue;
    compareToValue(context: Context, value: IValue): 1 | 0 | -1;
    hasItem(context: Context, value: IValue): boolean;
    GetMemberValue(context: Context, member: Identifier): IValue;
    GetItemValue(context: Context, index: IValue): IValue;
    getIterator(context: Context): IIterator<CharacterValue>;
    convertToJavaScript(): string;
    slice(fi: IntegerValue | null, li: IntegerValue | null): TextValue;
    checkFirst(fi: IntegerValue | null): number;
    checkLast(li: IntegerValue | null): number;
    equals(obj: any): boolean;
    Roughly(context: Context, value: IValue): boolean;
    Contains(context: Context, value: IValue): boolean;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
