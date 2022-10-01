/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BaseValue from "./BaseValue";
import { DbIdType } from "../type";
import {Context} from "../runtime";
import {JsonNode, JsonParent} from "../json";

export default class DbIdValue extends BaseValue<any> {

    constructor(value: any) {
        super(DbIdType.instance, value);
    }

    toString() {
        return String(this.value);
    }

    toJsonNode() {
        return String(this.value);
    }

    getStorableData(): any {
        return this.value;
    }

    convertToJavaScript(): any {
        return this.value;
    }

    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        // need a type because value could be a non native JSON type such as UUID
        const value = withType ? { type: DbIdType.instance.name, value: this.value } : this.value;
        if(Array.isArray(json))
            json.push(value as JsonNode);
        else
            json.set(fieldName, value as JsonNode);

    }


}
