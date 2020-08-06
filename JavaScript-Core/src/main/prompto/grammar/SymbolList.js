const ObjectList = require("../utils/ObjectList").ObjectList;
const MissingType = require("../type/MissingType").MissingType;

class SymbolList extends ObjectList {
    constructor(symbol) {
        super(MissingType.instance);
        if(symbol)
            this.add(symbol);
        return this;
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


exports.SymbolList = SymbolList;
