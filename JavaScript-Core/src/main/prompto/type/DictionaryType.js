var Identifier = require("../grammar/Identifier").Identifier;
var ContainerType = require("./ContainerType").ContainerType;
var BooleanType = require("./BooleanType").BooleanType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var SetType = require("./SetType").SetType;
var ListType = require("./ListType").ListType;
var EntryType = require("./EntryType").EntryType;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;

function DictionaryType(itemType) {
	ContainerType.call(this, new Identifier(itemType.name+"{}"), itemType);
	this.itemType = itemType;
	return this;
}

DictionaryType.prototype = Object.create(ContainerType.prototype);
DictionaryType.prototype.constructor = DictionaryType;


DictionaryType.prototype.isAssignableFrom = function(context, other) {
    return ContainerType.prototype.isAssignableFrom.call(this, context, other)
	    || ((other instanceof DictionaryType) && this.itemType.isAssignableFrom(context, other.itemType));
};


DictionaryType.prototype.equals = function(obj) {
	if (obj == null) {
		return false;
	} else if (obj == this) {
		return true;
	} else if (!(obj instanceof DictionaryType)) {
		return false;
	} else {
		return this.itemType.equals(obj.itemType);
	}
};



DictionaryType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
		return this;
	} else {
		return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};


DictionaryType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareAdd.call(this, context, other, tryReverse, left, right);
    }
};


DictionaryType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".add(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileAdd.call(this, context, other, tryReverse, left, right);
    }
};



DictionaryType.prototype.checkContains = function(context, other) {
    if(other==TextType.instance) {
        return BooleanType.instance;
    } else {
        return ContainerType.prototype.checkContains.call(this, context, other);
    }
};


DictionaryType.prototype.declareContains = function(transpiler, other, container, item) {
    transpiler.require(StrictSet);
    container.declare(transpiler);
    item.declare(transpiler);
};


DictionaryType.prototype.transpileContains = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".has(");
    item.transpile(transpiler);
    transpiler.append(")");
};


DictionaryType.prototype.checkContainsAllOrAny = function(context, other) {
    return BooleanType.instance;
};


DictionaryType.prototype.declareContainsAllOrAny = function(transpiler, other, container, item) {
    transpiler.require(StrictSet);
    container.declare(transpiler);
    item.declare(transpiler);
};


DictionaryType.prototype.transpileContainsAll = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    item.transpile(transpiler);
    transpiler.append(")");
};

DictionaryType.prototype.transpileContainsAny = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    item.transpile(transpiler);
    transpiler.append(")");
};


DictionaryType.prototype.checkItem = function(context, other) {
	if(other==TextType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, other);
	}
};


DictionaryType.prototype.checkIterator = function(context) {
	return new EntryType(this.itemType);
};

DictionaryType.prototype.checkMember = function(context, name) {
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


DictionaryType.prototype.declareMember = function(transpiler, name) {
    if("keys"==name) {
        transpiler.require(StrictSet);
    } else if (!("count"===name || "values"==name)) {
        ContainerType.prototype.declareMember.call(this, transpiler, name);
    }
};


DictionaryType.prototype.transpileMember = function(transpiler, name) {
    if ("count"==name) {
        transpiler.append("length");
    } else if("keys"===name || "values"==name) {
        transpiler.append(name);
    } else {
        ContainerType.prototype.transpileMember.call(this, transpiler, name);
    }
};


exports.DictionaryType = DictionaryType;
