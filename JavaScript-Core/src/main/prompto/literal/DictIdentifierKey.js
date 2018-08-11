var TextValue = require("../value/TextValue").TextValue;

function DictIdentifierKey(id) {
    this.id = id;
    return this;
}

DictIdentifierKey.prototype.toString = function() {
    return this.id.toString();
};

DictIdentifierKey.prototype.asKey = function() {
    return this.id.toString();
};

DictIdentifierKey.prototype.asText = function() {
    return new TextValue(this.asKey());
};


exports.DictIdentifierKey = DictIdentifierKey;