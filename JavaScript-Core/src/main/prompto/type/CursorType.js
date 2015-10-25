var ContainerType = require("./ContainerType").ContainerType;
var IntegerType = require("./IntegerType").IntegerType;

function CursorType(itemType) {
    ContainerType.call(this, itemType.name + "[]", itemType);
    return this;
}

CursorType.prototype = Object.create(ContainerType.prototype);
CursorType.prototype.constructor = CursorType;

CursorType.prototype.isAssignableTo = function(context, other) {
    return (other instanceof CursorType) && itemType.isAssignableTo(context, other.itemType);
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
        return ContainerType.prototype.checkMember.call(this, context, name);
};

exports.CursorType = CursorType;
