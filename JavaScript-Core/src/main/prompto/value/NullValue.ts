import BaseValue from "./BaseValue";
import { NullType } from '../type'
import {Context} from "../runtime";
import {JsonParent} from "../json";

export default class NullValue extends BaseValue<any> {

    static instance = new NullValue();

    constructor() {
        super(NullType.instance, false);
    }

    toString(): string {
        return "null";
    }

   getStorableData(): any {
        return null; // <- YES!
    }

    convertToJavaScript(): any {
        return null; // <- YES!
    }

    toJsonNode(): any {
        return null; // <- YES!
    }

    toJsonStream(context: Context, values: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        if(Array.isArray(values))
            values.push(null);
        else
            throw new Error("Should never get there!");
    }

}

