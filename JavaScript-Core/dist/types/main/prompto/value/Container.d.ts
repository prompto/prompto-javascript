import BaseValue from "./BaseValue";
import { IValue } from '../value';
import { ContainerType, IType } from '../type';
import { Context } from "../runtime";
import { JsonParent } from "../json";
import IValueIterable from "./IValueIterable";
import { IIterator } from "../intrinsic";
export default abstract class Container<T extends Iterable<IValue>> extends BaseValue<T> implements IValueIterable {
    protected static makeItems(items?: IValue[], item?: IValue): IValue[];
    constructor(type: ContainerType, value: T, mutable: boolean);
    get itemType(): IType;
    abstract get items(): IValue[];
    abstract getIterator(context: Context): IIterator<IValue>;
    abstract filter(filter: (value: IValue) => boolean): Container<any>;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
    toDocumentValue(context: Context): IValue;
    abstract hasValue(context: Context, value: IValue): boolean;
}
