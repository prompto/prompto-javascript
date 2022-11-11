import BaseValue from "./BaseValue";
import { Context } from "../runtime";
import { JsonParent } from "../json";
export default class DbIdValue extends BaseValue<any> {
    constructor(value: any);
    toString(): string;
    toJsonNode(): string;
    getStorableData(): any;
    convertToJavaScript(): any;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
