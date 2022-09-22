import Value from "./Value";
import { TextValue } from './index'
import { SyntaxError } from '../error'
import {Type} from "../type";
import {Context, Transpiler} from "../runtime";
import {Storable} from "../store";
import {Identifier} from "../grammar";
import {JsonNode, JsonParent} from "../json";

export default abstract class BaseValue<T> implements Value {

    static id = 0;

    id: number;
    type: Type;
    value: T;
    mutable: boolean;

    constructor(type: Type, value: T, mutable = false) {
        this.id = ++BaseValue.id;
        this.type = type;
        this.value = value;
        this.mutable = mutable;
    }

    getValue(): T {
        return this.value;
    }

    equals(value: any): boolean {
        return this == value;
    }

    getMemberValue(context: Context, id: Identifier, autocreate?: boolean): Value {
        if("text" === id.name)
            return new TextValue(this.toString());
        else if("json" === id.name) {
            const node = this.toJsonNode();
            return new TextValue(JSON.stringify(node));
        } else
            throw new SyntaxError("No member support for " + id.name + " in " + this.constructor.name);
    }

    abstract toJsonNode(): JsonNode;
    abstract toJsonStream(context: Context, values: JsonParent, instanceId: never, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void;

    toDocumentValue(context: Context): Value {
        return this;
    }

    abstract getStorableData(): any;
    collectStorables(storables: Set<Storable>): void {
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

    And(context: Context, value: Value): Value {
        throw new SyntaxError("Logical and not supported by " + this.constructor.name);
    }

    Or(context: Context, value: Value): Value {
        throw new SyntaxError("Logical or not supported by " + this.constructor.name);
    }

    Not(context: Context): Value {
        throw new SyntaxError("Logical negation not supported by " + this.constructor.name);
    }
    Add(context: Context, value: Value): Value {
        throw new SyntaxError("Add not supported by " + this.constructor.name);
    }

    Subtract(context: Context, value: Value): Value {
        throw new SyntaxError("Subtract not supported by " + this.constructor.name);
    }

    Multiply(context: Context, value: Value): Value {
        throw new SyntaxError("Multiply not supported by " + this.constructor.name);
    }

    Divide(context: Context, value: Value): Value {
        throw new SyntaxError("Divide not supported by " + this.constructor.name);
    }

    IntDivide(context: Context, value: Value): Value {
        throw new SyntaxError("IntDivide not supported by " + this.constructor.name);
    }

    Modulo(context: Context, value: Value): Value {
        throw new SyntaxError("Modulo not supported by " + this.constructor.name);
    }

    Minus(context: Context): Value {
        throw new SyntaxError("Minus not supported by " + this.constructor.name);
    }

    Contains(context: Context, value: Value): boolean {
        throw new SyntaxError("Contains not supported by " + this.constructor.name);
    }

    CompareTo(context: Context, value: Value): number  {
        throw new SyntaxError("CompareTo not supported by " + this.constructor.name);
    }

    ConvertTo(type: Type): Value {
        return this;
    }

    Roughly(context: Context, value: Value): boolean {
        return this.equals(value);
    }

}


