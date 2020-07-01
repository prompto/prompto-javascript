var TextValue = require("../value/TextValue").TextValue;

function DocIdentifierKey(id) {
    this.id = id;
    return this;
}

DocIdentifierKey.prototype.toString = function() {
    return this.id.name;
};

DocIdentifierKey.prototype.stringValue = function() {
    return this.id.name;
};


DocIdentifierKey.prototype.transpile = function(transpiler) {
    transpiler.append(this.id.name);
};


DocIdentifierKey.prototype.interpret = function(context) {
    return new TextValue(this.stringValue());
};


exports.DocIdentifierKey = DocIdentifierKey;