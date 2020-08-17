
export default class SymbolList extends ObjectList {

    constructor(symbol) {
        super(MissingType.instance);
        if(symbol)
            this.add(symbol);
    }

    getIterator(context) {
        return new SymbolListIterator(this, context);
    }

    toString() {
        const names = this.map(s => s.name);
        return "[" + names.join(", ") + "]";
    }
}

class SymbolListIterator {
    constructor(symbols, context) {
        this.symbols = symbols;
        this.context = context;
        this.idx = 0;
        return this;
    }

    hasNext() {
        return this.idx<this.symbols.length;
    }

    next() {
        return this.symbols[this.idx++].interpret(this.context);
    }
}
