var Section = require("../parser/Section").Section;

function Symbol(id) {
    Section.call(this);
    this.id = id;
    return this;
}

Symbol.prototype = Object.create(Section.prototype);
Symbol.prototype.constructor = Symbol;

Object.defineProperty(Symbol.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

Symbol.prototype.register = function (context) {
    context.registerValue(this);
};


Symbol.prototype.unregister = function (context) {
    context.unregisterValue(this);
};


exports.Symbol = Symbol;
