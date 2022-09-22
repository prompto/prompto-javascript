import ObjectList from '../utils/ObjectList'
import EnumSymbol from "../expression/EnumSymbol";
import {Context} from "../runtime";
import {Iterator} from "../intrinsic";

export default abstract class SymbolList<T extends EnumSymbol> extends ObjectList<T> {

    constructor(symbols?: T[], symbol?: T) {
        super(symbols, symbol);
    }

    getIterator(context: Context): Iterator<T> {
        return new SymbolListIterator<T>(this, context);
    }

    toString() {
        const names = this.map(s => s.name);
        return "[" + names.join(", ") + "]";
    }
}

class SymbolListIterator<T extends EnumSymbol> implements Iterator<T> {

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
        return this.symbols[this.idx++].interpret(this.context) as T;
    }
}
