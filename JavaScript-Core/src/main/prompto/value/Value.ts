import {Type} from "../type";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";
import {Storable} from "../store";
import {JsonNode, JsonParent} from "../json";

export default interface Value {
    type: Type;
    mutable: boolean;
    toDialect?: (writer: CodeWriter) => void;

    CompareTo(context: Context, other: Value): number;
    Divide(context: Context, other: Value): Value;

    equals(other: Value): boolean;
    getStorableData(): any;
    collectStorables(storables: Set<Storable>): void;
    convertToJavaScript(): any;
    toDocumentValue(context: Context): Value;
    toJsonStream(context: Context, values: JsonParent, instanceId: never | null, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
    toJsonNode(): JsonNode;

}


