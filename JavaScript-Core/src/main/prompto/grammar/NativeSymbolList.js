var SymbolList = require("./SymbolList").SymbolList;

class NativeSymbolList extends SymbolList {
    constructor(symbol) {
        super(symbol);
        return this;
    }
}

exports.NativeSymbolList = NativeSymbolList;
