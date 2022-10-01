import ObjectList from '../utils/ObjectList'
import EnumSymbol from "../expression/EnumSymbol";
import {Context} from "../runtime";
import {IIterator, IResource, IValue} from "../value";
import {IType, MissingType} from "../type";
import {IStorable} from "../store";
import {JsonNode, JsonParent} from "../json";
import {Identifier} from "./index";

export default abstract class SymbolList<T extends EnumSymbol<never>> extends ObjectList<T> implements IValue {

    type: IType;
    mutable = false;
    value: any = this;

    constructor(symbols?: T[], symbol?: T) {
        super(symbols, symbol);
        this.type = MissingType.instance;
    }

    getIterator(context: Context): IIterator<T> {
        return new SymbolListIterator<T>(this, context);
    }

    toString() {
        const names = this.map(s => s.name);
        return "[" + names.join(", ") + "]";
    }

    Add(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    And(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    CompareTo(context: Context, other: IValue): number {
        throw new Error('Method not implemented.');
    }

    Divide(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    GetItemValue(context: Context, item: IValue, autoCreate?: boolean): IValue {
        throw new Error('Method not implemented.');
    }

    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean): IValue {
        throw new Error('Method not implemented.');
    }

    IntDivide(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    Minus(context: Context): IValue {
        throw new Error('Method not implemented.');
    }

    Modulo(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    Multiply(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    Not(context: Context): IValue {
        throw new Error('Method not implemented.');
    }

    Or(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    SetItemValue(context: Context, item: IValue, value: IValue): void {
        throw new Error('Method not implemented.');
    }

    SetMemberValue(context: Context, member: Identifier, value: IValue): void {
        throw new Error('Method not implemented.');
    }

    Subtract(context: Context, other: IValue): IValue {
        throw new Error('Method not implemented.');
    }

    asResource(): IResource {
        throw new Error('Method not implemented.');
    }

    collectStorables(storables: Set<IStorable>): void {
        throw new Error('Method not implemented.');
    }

    convertToJavaScript(): any {
        throw new Error('Method not implemented.');
    }

    equals(other: IValue): boolean {
        throw new Error('Method not implemented.');
    }

    getStorableData(): any {
        throw new Error('Method not implemented.');
    }

    isIterable(): boolean {
        throw new Error('Method not implemented.');
    }

    isResource(): boolean {
        throw new Error('Method not implemented.');
    }

    isSliceable(): boolean {
        throw new Error('Method not implemented.');
    }

    toDocumentValue(context: Context): IValue {
        throw new Error('Method not implemented.');
    }

    toJsonNode(): JsonNode {
        throw new Error('Method not implemented.');
    }

    toJsonStream(context: Context, values: JsonParent, instanceId: null, fieldName: string, withType: boolean, binaries: Map<string, never> | null): void {
        throw new Error('Method not implemented.');
    }
}

class SymbolListIterator<T extends EnumSymbol<never>> implements IIterator<T> {

    symbols: SymbolList<T>;
    context: Context;
    idx: number;

    constructor(symbols: SymbolList<T>, context: Context) {
        this.symbols = symbols;
        this.context = context;
        this.idx = 0;
    }

    hasNext(): boolean {
        return this.idx<this.symbols.length;
    }

    next(): T {
        const symbol = this.symbols[this.idx++];
        return symbol.interpret(this.context) as unknown as T;
    }
}
