import BaseValue from "./BaseValue";
import {IValue, ListValue} from '../value'
import {AnyType, ContainerType, IType} from '../type'
import {Context} from "../runtime";
import {JsonArray, JsonParent} from "../json";
import IValueIterable from "./IValueIterable";
import {IIterator} from "../intrinsic";

export default abstract class Container<T extends Iterable<IValue>> extends BaseValue<T> implements IValueIterable {

    protected static makeItems(items?: IValue[], item?: IValue): IValue[] {
        let value: IValue[];
        if(items && item)
            value = items.concat([item]);
        else if(items)
            value = items;
        else if (item)
            value = [item];
        else
            value = [];
        return value;
    }

    constructor(type: ContainerType, value: T, mutable: boolean) {
        super(type, value, mutable);
    }

    get itemType(): IType {
        return (this.type as ContainerType).itemType;
    }

    abstract get items(): IValue[];
    abstract getIterator(context: Context): IIterator<IValue>;
    abstract filter(filter: (value: IValue) => boolean): Container<any>;

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        const values: JsonArray = [];
        this.items.forEach(item => item.toJsonStream(context, values, instanceId, fieldName, withType, binaries));
        if(Array.isArray(json))
            json.push(...values);
        else
            json.set(fieldName, values);
    }

    toDocumentValue(context: Context): IValue {
        const values = this.items.map(item => item.toDocumentValue(context));
        return new ListValue(AnyType.instance, false, values);
    }

    abstract hasValue(context: Context, value: IValue): boolean;

}
