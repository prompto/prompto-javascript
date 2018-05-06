var Identifier = require("../grammar/Identifier").Identifier;
var ContainerType = require("./ContainerType").ContainerType;
var BooleanType = require("./BooleanType").BooleanType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var SetType = require("./SetType").SetType;
var ListType = require("./ListType").ListType;
var EntryType = require("./EntryType").EntryType;

function DictType(itemType) {
	ContainerType.call(this, new Identifier(itemType.name+"{}"), itemType);
	this.itemType = itemType;
	return this;
}

DictType.prototype = Object.create(ContainerType.prototype);
DictType.prototype.constructor = DictType;


DictType.prototype.isAssignableFrom = function(context, other) {
    return ContainerType.prototype.isAssignableFrom.call(this, context, other)
	    || ((other instanceof DictType) && this.itemType.isAssignableFrom(context, other.itemType));
};


DictType.prototype.equals = function(obj) {
	if (obj == null) {
		return false;
	} else if (obj == this) {
		return true;
	} else if (!(obj instanceof DictType)) {
		return false;
	} else {
		return this.itemType.equals(obj.itemType);
	}
};

DictType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other instanceof DictType && this.itemType.equals(other.itemType)) {
		return this;
	} else {
		return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};


DictType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof DictType && this.itemType.equals(other.itemType)) {
        transpiler.append("Object.assign({},");
        left.transpile(transpiler);
        transpiler.append(",");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileAdd.call(this, context, other, tryReverse, left, right);
    }
};



DictType.prototype.checkContains = function(context, other) {
    if(other==TextType.instance) {
        return BooleanType.instance;
    } else {
        return ContainerType.prototype.checkContains.call(this, context, other);
    }
};



DictType.prototype.checkContainsAllOrAny = function(context, other) {
    return BooleanType.instance;
};



DictType.prototype.checkItem = function(context, other) {
	if(other==TextType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, other);
	}
};


DictType.prototype.checkIterator = function(context) {
	return new EntryType(this.itemType);
};

DictType.prototype.checkMember = function(context, name) {
	if ("count"==name) {
		return IntegerType.instance;
	} else if("keys"==name) {
		return new SetType(TextType.instance);
	} else if ("values"==name) {
		return new ListType(this.itemType);
	} else {
		return ContainerType.prototype.checkMember.call(this, context, name);
	}
};

exports.DictType = DictType;
