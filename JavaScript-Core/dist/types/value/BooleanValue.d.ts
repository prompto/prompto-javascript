import BaseValue from "./BaseValue";
import { Context } from "../runtime";
import IValue from "./IValue";
import { JsonParent } from "../json";
export default class BooleanValue extends BaseValue<boolean> {
    static TRUE: BooleanValue;
    static FALSE: BooleanValue;
    not: BooleanValue;
    constructor(value: boolean);
    static init(): void;
    static ValueOf(value: boolean): BooleanValue;
    static Parse(text: string): BooleanValue;
    convertToJavaScript(): boolean;
    getStorableData(): any;
    toJsonNode(): boolean;
    And(context: Context, value: IValue): IValue;
    Or(context: Context, value: IValue): IValue;
    Not(): BooleanValue;
    toString(): string;
    equals(obj: any): boolean;
    toJsonStream(context: Context, json: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;
}
