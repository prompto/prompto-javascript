var IterableType = require("./IterableType").IterableType;
var IntegerType = require("./IntegerType").IntegerType;
var Identifier = require("../grammar/Identifier").Identifier;

function CursorType(itemType) {
    IterableType.call(this, new Identifier("Cursor<" + itemType.name + ">"), itemType);
    return this;
}

CursorType.prototype = Object.create(IterableType.prototype);
CursorType.prototype.constructor = CursorType;

CursorType.prototype.isAssignableFrom = function(context, other) {
    return IterableType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof CursorType) && this.itemType.isAssignableFrom(context, other.itemType));
};

CursorType.prototype.equals = function(obj) {
    if(obj==this)
        return true;
    if(!(obj instanceof CursorType))
        return false;
    return this.itemType.equals(other.itemType);
};

CursorType.prototype.checkIterator = function(context) {
    return this.itemType;
};

CursorType.prototype.checkMember = function(context, name) {
    if ("length"===name)
        return IntegerType.instance;
    else
        return IterableType.prototype.checkMember.call(this, context, name);
};

exports.CursorType = CursorType;
