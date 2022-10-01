import {IType} from "../type";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";
import {IStorable} from "../store";
import {JsonNode, JsonParent} from "../json";
import {Identifier} from "../grammar";
import {IIterator, IResource} from "./index";

export default interface IValue {
    type: IType;
    mutable: boolean;
    value: any; // should use generic but that's a lot of complexity for just 1 warning
    toDialect?: (writer: CodeWriter) => void;

    // use uppercase methods for direct prompto equivalents
    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean): IValue;
    SetMemberValue(context: Context, member: Identifier, value: IValue): void;
    GetItemValue(context: Context, item: IValue, autoCreate?: boolean): IValue;
    SetItemValue(context: Context, item: IValue, value: IValue): void;
    CompareTo(context: Context, other: IValue): number;
    Add(context: Context, other: IValue): IValue;
    Subtract(context: Context, other: IValue): IValue;
    Multiply(context: Context, other: IValue): IValue;
    Divide(context: Context, other: IValue): IValue;
    IntDivide(context: Context, other: IValue): IValue;
    Modulo(context: Context, other: IValue): IValue;
    Minus(context: Context): IValue;
    And(context: Context, other: IValue): IValue;
    Or(context: Context, other: IValue): IValue;
    Not(context: Context): IValue;

    // use lowercase for internals
    equals(other: IValue): boolean;
    isResource(): boolean;
    asResource(): IResource;
    isIterable(): boolean;
    getIterator(context: Context): IIterator<IValue>;
    isSliceable(): boolean;
    getStorableData(): any;
    collectStorables(storables: Set<IStorable>): void;
    convertToJavaScript(): any;
    toDocumentValue(context: Context): IValue;
    toJsonStream(context: Context, values: JsonParent, instanceId: any, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
    toJsonNode(): JsonNode;

}


