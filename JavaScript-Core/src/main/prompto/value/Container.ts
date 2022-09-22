import BaseValue from "./BaseValue";
import {Value, DocumentValue, ListValue} from '../value'
import {AnyType, ContainerType, Type} from '../type'
import {Context} from "../runtime";
import {JsonNode, JsonParent} from "../json";
import {Iterator} from "../intrinsic";

export default abstract class Container<T extends Iterable<Value>> extends BaseValue<T> {

    constructor(type: ContainerType, value: T, mutable: boolean) {
        super(type, value, mutable);
    }

    get itemType(): Type {
        return (this.type as ContainerType).itemType;
    }

    abstract get items(): Value[];
    abstract getIterator(context: Context): Iterator<Value>;

    toJson(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: never[]): void {
        const values: JsonNode[] = [];
        this.items.forEach(item => item.toJson(context, values, instanceId, fieldName, withType, binaries));
        if(Array.isArray(json))
            json.push(...values);
        else
            json[fieldName as keyof typeof json] = values as never;
    }

    toDocumentValue(context: Context): DocumentValue {
        const values = this.items.map(item => item.toDocumentValue(context));
        return new ListValue(AnyType.instance, false, values);
    }

    abstract hasValue(context: Context, value: Value): boolean;

}
