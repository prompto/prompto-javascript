var ContainerType = require("./ContainerType").ContainerType;
var ListType = require("./ListType").ListType;
var IntegerType = require("./IntegerType").IntegerType;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;

function SetType(itemType) {
	ContainerType.call(this, new Identifier(itemType.name+"<>"), itemType);
	this.itemType = itemType;
	return this;
}

SetType.prototype = Object.create(ContainerType.prototype);
SetType.prototype.constructor = SetType;


SetType.prototype.equals = function(obj) {
	if(obj===this) {
		return true;
	}
	if(obj===null) {
		return false;
	}
	if(!(obj instanceof SetType)) {
		return false;
	}
	return this.itemType.equals(obj.itemType);
};

SetType.prototype.checkAdd = function(context, other, tryReverse) {
	if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType, tryReverse)) {
		return this;
	} else {
		return ContainerType.prototype.checkAdd.call(this, context, other);
	}
};

SetType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType, tryReverse)) {
        left.transpile(transpiler);
        transpiler.append(".addAll(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


SetType.prototype.checkItem = function(context, other) {
	if(other==IntegerType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, other);
	}
};

SetType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
}

SetType.prototype.checkIterator = function(context) {
	return this.itemType;
}

SetType.prototype.checkMember = function(context, name) {
	if ("count" == name) {
		return IntegerType.instance;
	} else {
		return ContainerType.prototype.checkMember.call(this, context, name);
	}
};


SetType.prototype.isAssignableFrom = function(context, other) {
    return ContainerType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof SetType) && this.itemType.isAssignableFrom(context, other.itemType));
};


exports.SetType = SetType;
