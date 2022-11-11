import BaseValue from './BaseValue';
import { IType } from "../type";
import { Identifier } from "../grammar";
import IValue from "./IValue";
import { Context } from "../runtime";
import { JsonNode, JsonParent } from "../json";
export default class TypeValue extends BaseValue<IType> {
    constructor(value: IType);
    toString(): string;
    getMemberValue(context: Context, id: Identifier, autoCreate: boolean): IValue;
    getStorableData(): any;
    toJsonNode(): JsonNode;
    toJsonStream(context: Context, values: JsonParent, instanceId: null, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
