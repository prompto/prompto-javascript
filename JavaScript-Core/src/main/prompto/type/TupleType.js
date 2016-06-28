var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var SetType = require("./SetType").SetType;
var ListType = require("./ListType").ListType;
var IntegerType = require("./IntegerType").IntegerType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;

function TupleType()  {
	NativeType.call(this, new Identifier("Tuple"));
	return this;
}

TupleType.prototype = Object.create(NativeType.prototype);
TupleType.prototype.constructor = TupleType;

TupleType.instance = new TupleType();

TupleType.prototype.isAssignableFrom = function(context, other) {
    return ContainerType.prototype.isAssignableFrom.call(this, context, other)
        || (other instanceof ListType) || (other instanceof SetType);
};

TupleType.prototype.checkItem = function(context, other) {
	if(other==IntegerType.instance) {
		return AnyType.instance;
	} else {
		return NativeType.prototype.checkItem.call(this, context, other);
	}
};

TupleType.prototype.checkMember = function(context, name) {
	if ("count"==name) {
		return IntegerType.instance;
	} else {
		return NativeType.prototype.checkMember.call(this, context, name);
	}
};

TupleType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other instanceof TupleType || other instanceof ListType || other instanceof SetType) {
		return this;
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};

TupleType.prototype.checkContains = function(context, other) {
	return BooleanType.instance;
};

TupleType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
};

exports.TupleType = TupleType;
