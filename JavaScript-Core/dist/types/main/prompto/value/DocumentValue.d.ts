import BaseValue from './BaseValue';
import { IValue, NullValue, SetValue, ListValue } from './index';
import { Document } from '../intrinsic';
import { JsonObject, JsonParent } from '../json';
import { Context, Transpiler } from '../runtime';
import { Identifier } from "../grammar";
export default class DocumentValue extends BaseValue<Document<string, IValue>> {
    constructor(values?: Document<string, IValue>);
    getMemberNames(): string[];
    getStorableData(): any;
    convertToJavaScript(): Document<string, IValue>;
    hasMember(name: string): boolean;
    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean): IValue;
    getMemberValue(member: string, autoCreate?: boolean): IValue;
    getMemberValues(): ListValue;
    getMemberKeys(): SetValue;
    setMember(context: Context, name: string, value: IValue): void;
    GetItemValue(context: Context, index: IValue): IValue | NullValue;
    SetItemValue(context: Context, index: IValue, value: IValue): void;
    Add(context: Context, value: IValue): IValue;
    equals(other: any): boolean;
    toString(): string;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
    declare(transpiler: Transpiler): void;
    toJsonNode(): JsonObject;
}
