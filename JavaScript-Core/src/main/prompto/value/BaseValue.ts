import IValue from "../../../main/prompto/value/IValue";
import {IResource, TextValue} from './index'
import { SyntaxError } from '../error'
import {IType} from "../type";
import {Context, Transpiler} from "../runtime";
import {IStorable} from "../store";
import {Identifier} from "../grammar";
import {JsonNode, JsonParent} from "../json";
import { CodeWriter } from "../utils";
import IIterator from "./IIterator";

export default abstract class BaseValue<T> implements IValue {

    static id = 0;

    id: number;
    type: IType;
    value: T;
    mutable: boolean;

    constructor(type: IType, value: T, mutable = false) {
        this.id = ++BaseValue.id;
        this.type = type;
        this.value = value;
        this.mutable = mutable;
    }

    toDialect?: ((writer: CodeWriter) => void) | undefined;

    isIterable(): boolean {
        return false;
    }

    getIterator(context: Context): IIterator<IValue> {
        throw new Error("Method not implemented.");
    }

    isSliceable(): boolean {
        return false;
    }

    isResource(): boolean {
        return false;
    }

    asResource(): IResource {
        throw new Error("Method not implemented.");
    }

    getValue(): T {
        return this.value;
    }

    equals(value: any): boolean {
        return this == value;
    }

    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean): IValue {
        if("text" == member.name)
            return new TextValue(this.toString());
        else if("json" == member.name) {
            const node = this.toJsonNode();
            return new TextValue(JSON.stringify(node));
        } else
            throw new SyntaxError("No member support for " + member.name + " in " + this.constructor.name);
    }

    SetMemberValue(context: Context, member: Identifier, value: IValue) {
        throw new SyntaxError("No member support for " + member.name + " in " + this.constructor.name);
    }


    GetItemValue(context: Context, item: IValue, autoCreate?: boolean): IValue {
        throw new SyntaxError("No item support for " + item.toString() + " in " + this.constructor.name);
    }

    SetItemValue(context: Context, item: IValue, value: IValue) {
        throw new SyntaxError("No item support for " + item.toString() + " in " + this.constructor.name);
    }

    toJsonNode(): JsonNode {
        throw new SyntaxError("Should never get there!");
    }

    toJsonStream(context: Context, values: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        throw new SyntaxError("Should never get there!");
    }

    toDocumentValue(context: Context): IValue {
        return this;
    }

    getStorableData(): any {
        throw new SyntaxError("Should never get there!");
    }

    collectStorables(storables: Set<IStorable>): void {
        // nothing to do
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void  {
        throw new SyntaxError("transpile not implemented by " + this.constructor.name);
    }


    convertToJavaScript(): any {
        throw new SyntaxError("convertToJavaScript not implemented by " + this.constructor.name);
    }

    And(context: Context, value: IValue): IValue {
        throw new SyntaxError("Logical and not supported by " + this.constructor.name);
    }

    Or(context: Context, value: IValue): IValue {
        throw new SyntaxError("Logical or not supported by " + this.constructor.name);
    }

    Not(context: Context): IValue {
        throw new SyntaxError("Logical negation not supported by " + this.constructor.name);
    }
    Add(context: Context, value: IValue): IValue {
        throw new SyntaxError("Add not supported by " + this.constructor.name);
    }

    Subtract(context: Context, value: IValue): IValue {
        throw new SyntaxError("Subtract not supported by " + this.constructor.name);
    }

    Multiply(context: Context, value: IValue): IValue {
        throw new SyntaxError("Multiply not supported by " + this.constructor.name);
    }

    Divide(context: Context, value: IValue): IValue {
        throw new SyntaxError("Divide not supported by " + this.constructor.name);
    }

    IntDivide(context: Context, value: IValue): IValue {
        throw new SyntaxError("IntDivide not supported by " + this.constructor.name);
    }

    Modulo(context: Context, value: IValue): IValue {
        throw new SyntaxError("Modulo not supported by " + this.constructor.name);
    }

    Minus(context: Context): IValue {
        throw new SyntaxError("Minus not supported by " + this.constructor.name);
    }

    Contains(context: Context, value: IValue): boolean {
        throw new SyntaxError("Contains not supported by " + this.constructor.name);
    }

    CompareTo(context: Context, value: IValue): number  {
        throw new SyntaxError("CompareTo not supported by " + this.constructor.name);
    }

    ConvertTo(type: IType): IValue {
        return this;
    }

    Roughly(context: Context, value: IValue): boolean {
        return this.equals(value);
    }

}


