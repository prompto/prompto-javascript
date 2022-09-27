import ObjectList from '../utils/ObjectList'
import EnumSymbol from "../expression/EnumSymbol";
import {Context} from "../runtime";
import {IIterator} from "../value";

export default abstract class SymbolList<T extends EnumSymbol<never>> extends ObjectList<T> {

    constructor(symbols?: T[], symbol?: T) {
        super(symbols, symbol);
    }

    getIterator(context: Context): IIterator<T> {
        return new SymbolListIterator<T>(this, context);
    }

    toString() {
        const names = this.map(s => s.name);
        return "[" + names.join(", ") + "]";
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
