var TextValue = require("../value/TextValue").TextValue;

function DocIdentifierKey(id) {
    this.id = id;
    return this;
}

DocIdentifierKey.prototype.toString = function() {
    return this.id.toString();
};

DocIdentifierKey.prototype.stringValue = function() {
    return this.id.toString();
};

DocIdentifierKey.prototype.interpret = function() {
    return new TextValue(this.stringValue());
};


exports.DocIdentifierKey = DocIdentifierKey;