import BaseValue from './BaseValue'
import {Type, TypeType} from "../type";
import {Identifier} from "../grammar";
import Value from "./Value";
import {Context} from "../runtime";
import {NullValue} from "./index";
import {JsonNode, JsonParent} from "../json";

export default class TypeValue extends BaseValue<Type> {
  
    constructor(value: Type) {
        super(new TypeType(value), value);
    }

    toString() {
        return this.value.toString();
    }

    getMemberValue(context: Context, id: Identifier, autoCreate: boolean): Value {
        const value = this.value.getStaticMemberValue(context, id);
        return value ? value : NullValue.instance;
    }

    getStorableData(): any {
        throw new Error("Should never get there!");
    }

    toJsonNode(): JsonNode {
        throw new Error("Should never get there!");
    }

    toJsonStream(context: Context, values: JsonParent, instanceId: null, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        throw new Error("Should never get there!");
    }
}

