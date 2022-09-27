import {IType} from "../type";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";
import {IStorable} from "../store";
import {JsonNode, JsonParent} from "../json";
import {Identifier} from "../grammar";

export default interface IValue {
    type: IType;
    mutable: boolean;
    toDialect?: (writer: CodeWriter) => void;

    CompareTo(context: Context, other: IValue): number;
    Divide(context: Context, other: IValue): IValue;
    IntDivide(context: Context, other: IValue): IValue;

    equals(other: IValue): boolean;
    getStorableData(): any;
    collectStorables(storables: Set<IStorable>): void;
    convertToJavaScript(): any;
    toDocumentValue(context: Context): IValue;
    toJsonStream(context: Context, values: JsonParent, instanceId: never | null, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
    toJsonNode(): JsonNode;

    getMemberValue(context: Context, id: Identifier): IValue | null;

    getItemInContext(context: Context, item: IValue): IValue;

    isIterable(): boolean;
}


