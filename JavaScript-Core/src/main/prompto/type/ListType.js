var ContainerType = require("./ContainerType").ContainerType;
var IntegerType = null;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;

exports.resolve = function() {
    IntegerType = require("./IntegerType").IntegerType;
};

function ListType(itemType) {
    ContainerType.call(this, new Identifier(itemType.name+"[]"), itemType);
	return this;
}
	
ListType.prototype = Object.create(ContainerType.prototype);
ListType.prototype.constructor = ListType;

/*
	@Override
	public Class<?> toJavaClass() {
		return List.class;
	}
*/

ListType.prototype.isAssignableFrom = function(context, other) {
    return ContainerType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof ListType) && this.itemType.isAssignableFrom(context, other.itemType));
};

ListType.prototype.equals = function(obj) {
	if(obj===this) {
		return true;
	}
	if(obj===null) {
		return false;
	}
	if(!(obj instanceof ListType)) {
		return false;
	}
	return this.itemType.equals(obj.itemType);
};

ListType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other instanceof ListType && this.itemType.equals(other.itemType)) {
		return this;
	} else {
		return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

ListType.prototype.checkItem = function(context, other) {
	if(other==IntegerType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, other);
	}
};

ListType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return this;
	} else {
		return ContainerType.prototype.checkMultiply.call(this, context, other, tryReverse);
	}
};

ListType.prototype.checkSlice = function(context) {
	return this;
};

ListType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
}

ListType.prototype.checkIterator = function(context) {
	return this.itemType;
}

ListType.prototype.checkMember = function(context, name) {
	if ("length" == name) {
		return IntegerType.instance;
	} else {
		return ContainerType.prototype.checkMember.call(this, context, name);
	}
};

exports.ListType = ListType;
