import BaseValue from "./BaseValue";
import { Context } from "../runtime";
import { JsonParent } from "../json";
export default class NullValue extends BaseValue<any> {
    static instance: NullValue;
    constructor();
    toString(): string;
    getStorableData(): any;
    convertToJavaScript(): any;
    toJsonNode(): any;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
