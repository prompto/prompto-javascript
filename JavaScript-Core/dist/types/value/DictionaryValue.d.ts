import BaseValue from './BaseValue';
import { TextValue, NullValue, IValue } from './index';
import { IType } from '../type';
import { Dictionary, IIterator } from '../intrinsic';
import { Context } from "../runtime";
import { Identifier } from "../grammar";
import { JsonNode } from "../json";
export default class DictionaryValue extends BaseValue<Dictionary<TextValue, IValue>> {
    constructor(itemType: IType, mutable?: boolean, dict?: Dictionary<TextValue, IValue>);
    toString(): string;
    isEmpty(): boolean;
    Add(context: Context, value: IValue): IValue;
    hasItem(context: Context, value: IValue): boolean;
    GetMemberValue(context: Context, member: Identifier): IValue;
    private getKeysValue;
    private getValuesValue;
    SetItemValue(context: Context, index: IValue, value: IValue): void;
    GetItemValue(context: Context, index: IValue): IValue | NullValue;
    convertToJavaScript(): Dictionary<string, any>;
    equals(obj: any): boolean;
    getIterator(context: Context): IIterator<IValue>;
    swap(context: Context): DictionaryValue;
    removeItem(key: IValue): void;
    removeValue(value: IValue): void;
    toJsonNode(): JsonNode;
}
