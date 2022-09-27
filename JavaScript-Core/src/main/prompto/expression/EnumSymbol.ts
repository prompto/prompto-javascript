import BaseExpression from './BaseExpression'
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {IStorable} from "../store";
import INamed from "../grammar/INamed";
import {MissingType, IType} from "../type";
import IValue from "../value/IValue";
import { JsonParent, JsonNode } from '../json';
import {CodeWriter} from "../utils";

export default abstract class EnumSymbol<T extends IType> extends BaseExpression implements INamed, IValue {

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

    collectStorables(storables: Set<IStorable>): void {
        // nothing to do
    }

    equals(value: any): boolean {
        return value instanceof EnumSymbol && this.name == value.name;
    }

    toDocumentValue(context: Context): IValue {
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

    CompareTo(context: Context, other: IValue): number {
        throw new Error('Method not implemented.');
    }

    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean | undefined): IValue {
        throw new Error('Method not implemented.');
    }
    GetItemValue(context: Context, item: IValue, autoCreate?: boolean | undefined): IValue {
        throw new Error('Method not implemented.');
    }
    Multiply(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }
    Divide(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }
    IntDivide(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }
    Modulo(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }
    Minus(context: Context): IValue {
        throw new Error('Method not implemented.');
    }
    isIterable(): boolean {
        throw new Error('Method not implemented.');
    }


}
