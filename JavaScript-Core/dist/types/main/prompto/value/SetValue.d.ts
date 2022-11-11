import Container from './Container';
import { ListValue } from './index';
import { IType } from '../type';
import { IIterator, StrictSet } from '../intrinsic';
import IValue from "./IValue";
import { Identifier } from "../grammar";
import { Context } from "../runtime";
import { JsonNode } from "../json";
export default class SetValue extends Container<StrictSet<IValue>> {
    constructor(itemType: IType, items?: IValue[] | StrictSet<IValue>);
    get items(): IValue[];
    add(item: IValue): void;
    toString(): string;
    size(): number;
    GetMemberValue(context: Context, id: Identifier): IValue;
    isEmpty(): boolean;
    hasValue(context: Context, value: IValue): boolean;
    GetItemValue(context: Context, index: IValue): IValue;
    Add(context: Context, value: IValue): IValue;
    Subtract(context: Context, value: IValue): IValue;
    filter(filter: (value: IValue) => boolean): SetValue;
    getIterator(context: Context): IIterator<IValue>;
    equals(obj: any): boolean;
    toListValue(): ListValue;
    toJsonNode(): JsonNode;
    getStorableData(): any;
}
