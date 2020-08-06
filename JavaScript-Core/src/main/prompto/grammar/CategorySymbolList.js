const SymbolList = require("./SymbolList").SymbolList;

class CategorySymbolList extends SymbolList {
    constructor(symbol) {
        super(symbol);
        return this;
    }
}

exports.CategorySymbolList = CategorySymbolList;
