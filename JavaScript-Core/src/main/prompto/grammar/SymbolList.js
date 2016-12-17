var ObjectList = require("../utils/ObjectList").ObjectList;
var MissingType = require("../type/MissingType").MissingType;

function SymbolList(symbol) {
    ObjectList.call(this, MissingType.instance);
	if(symbol)
        this.add(symbol);
	return this;
}

SymbolList.prototype = Object.create(ObjectList.prototype);
SymbolList.prototype.constructor = SymbolList;

SymbolList.prototype.getIterator = function(context) {
    return new SymbolListIterator(this, context);
};


SymbolList.prototype.toString = function() {
    var names = this.map(function(s) { return s.name;});
    return "[" + names.join(", ") + "]";
};

function SymbolListIterator(symbols, context) {
    this.symbols = symbols;
    this.context = context;
    this.idx = 0;
    return this;
};

SymbolListIterator.prototype.hasNext = function() {
    return this.idx<this.symbols.length;
};

SymbolListIterator.prototype.next = function() {
    return this.symbols[this.idx++].interpret(this.context);
};


exports.SymbolList = SymbolList;
