import BaseExpression from './BaseExpression'
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {Storable} from "../store";
import Named from "../grammar/Named";
import {MissingType, Type} from "../type";
import Value from "../value/Value";
import { JsonParent, JsonNode } from '../json';
import {CodeWriter} from "../utils";

export default abstract class EnumSymbol<T extends Type> extends BaseExpression implements Named, Value {

    id: Identifier;
    type: T = MissingType.instance;
    mutable: boolean;

    constructor(id: Identifier) {
        super();
        this.id = id;
        this.mutable = false;
    }

    get name(): string {
        return this.id.name;
    }

    getType(context: Context): T {
        return this.type;
    }

    register(context: Context): void {
        context.registerInstance(this, true);
    }

    unregister(context: Context): void {
        context.unregisterInstance(this);
    }

    getStorableData(): any {
        return this.id.name;
    }

    collectStorables(storables: Set<Storable>): void {
        // nothing to do
    }

    equals(value: any): boolean {
        return value instanceof EnumSymbol && this.name == value.name;
    }

    toDocumentValue(context: Context): Value {
        return this;
    }

    toJsonStream(context: Context, values: JsonParent, instanceId: null, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        throw new Error('Method not implemented.');
    }

    toJsonNode(): JsonNode {
        throw new Error('Method not implemented.');
    }

    convertToJavaScript(): string {
        return this.name;
    }

    toEDialect(writer: CodeWriter): void {
        this.toDialect(writer);
    }

    toMDialect(writer: CodeWriter): void {
        this.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        this.toDialect(writer);
    }

    abstract toDialect(writer: CodeWriter): void;

    CompareTo(context: Context, other: Value): number {
        throw new Error('Method not implemented.');
    }


}
