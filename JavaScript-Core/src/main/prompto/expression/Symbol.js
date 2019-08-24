var Expression = require("./Expression").Expression;

function Symbol(id) {
    Expression.call(this);
    this.id = id;
    this.mutable = false;
    return this;
}

Symbol.prototype = Object.create(Expression.prototype);
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


Symbol.prototype.getStorableData = function () {
    return this.id.name;
};


Symbol.prototype.collectStorables = function (storables) {
    // nothing to do
};


Symbol.prototype.equals = function(value) {
    return value instanceof Symbol && this.name === value.name;
};

exports.Symbol = Symbol;
