var IterableType = require("./IterableType").IterableType;
var IntegerType = require("./IntegerType").IntegerType;
var Identifier = require("../grammar/Identifier").Identifier;

function IteratorType(itemType) {
    IterableType.call(this, new Identifier("Iterator<" + itemType.name + ">"), itemType);
    return this;
}

IteratorType.prototype = Object.create(IterableType.prototype);
IteratorType.prototype.constructor = IteratorType;

IteratorType.prototype.isAssignableTo = function(context, other) {
    return (other instanceof IteratorType) && this.itemType.isAssignableTo(context, other.itemType);
};

IteratorType.prototype.equals = function(obj) {
    if(obj==this)
        return true;
    if(!(obj instanceof IteratorType))
        return false;
    return this.itemType.equals(other.itemType);
};

IteratorType.prototype.checkIterator = function(context) {
    return this.itemType;
};

IteratorType.prototype.checkMember = function(context, name) {
    if ("length"===name)
        return IntegerType.instance;
    else
        return IterableType.prototype.checkMember.call(this, context, name);
};

exports.IteratorType = IteratorType;
