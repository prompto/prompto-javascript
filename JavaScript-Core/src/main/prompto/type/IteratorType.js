var IterableType = require("./IterableType").IterableType;
var IntegerType = require("./IntegerType").IntegerType;
var Identifier = require("../grammar/Identifier").Identifier;
var ToListMethodDeclaration = require("./ToListMethodDeclaration").ToListMethodDeclaration;

function IteratorType(itemType) {
    IterableType.call(this, new Identifier("Iterator<" + itemType.name + ">"), itemType);
    return this;
}

IteratorType.prototype = Object.create(IterableType.prototype);
IteratorType.prototype.constructor = IteratorType;


IteratorType.prototype.withItemType = function(itemType) {
    return new IteratorType(itemType);
};


IteratorType.prototype.isAssignableFrom = function(context, other) {
    return IterableType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof IteratorType) && this.itemType.isAssignableFrom(context, other.itemType));
};

IteratorType.prototype.equals = function(other) {
    if(other==this)
        return true;
    if(!(other instanceof IteratorType))
        return false;
    return this.itemType.equals(other.itemType);
};

IteratorType.prototype.checkIterator = function(context, source) {
    return this.itemType;
};

IteratorType.prototype.checkMember = function(context, section, name) {
    if ("count"===name)
        return IntegerType.instance;
    else
        return IterableType.prototype.checkMember.call(this, context, section, name);
};

IteratorType.prototype.declare = function(transpiler) {
    this.itemType.declare(transpiler);
};

IteratorType.prototype.getMemberMethods = function(context, name) {
    switch (name) {
        case "toList":
            return [new ToListMethodDeclaration(this.itemType)];
        default:
            return IterableType.prototype.getMemberMethods.call(context, name);
    }
};

exports.IteratorType = IteratorType;
