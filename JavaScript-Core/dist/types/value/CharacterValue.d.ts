import BaseValue from "./BaseValue";
import { TextValue } from '../value';
import { Context } from "../runtime";
import { Identifier } from "../grammar";
import IValue from "./IValue";
export default class CharacterValue extends BaseValue<string> {
    constructor(value: string);
    static isWhitespace(c: string): boolean;
    GetMemberValue(context: Context, member: Identifier): IValue;
    toJsonNode(): string;
    Add(context: Context, value: IValue): TextValue;
    Multiply(context: Context, value: IValue): TextValue;
    cmp(obj: CharacterValue): 1 | 0 | -1;
    compareToValue(context: Context, value: IValue): 1 | 0 | -1;
    convertToJavaScript(): string;
    getValue(): string;
    toString(): string;
    equals(obj: any): boolean;
    Roughly(context: Context, value: IValue): boolean;
}
