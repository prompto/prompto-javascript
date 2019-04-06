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

SetType.prototype.withItemType = function(itemType) {
    return new SetType(itemType);
};

SetType.prototype.getTranspiledName = function(context) {
    return this.itemType.getTranspiledName(context) + "_set";
};


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
	if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
		return this;
	} else {
		return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};


SetType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


SetType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".addAll(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


SetType.prototype.checkSubtract = function(context, other) {
    if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
        return this;
    } else {
        return ContainerType.prototype.checkSubtract.call(this, context, other);
    }
};


SetType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareSubtract.call(this, transpiler, other, left, right);
    }
};


SetType.prototype.transpileSubtract= function(transpiler, other, left, right) {
    if((other instanceof SetType || other instanceof ListType) && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".remove(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
    }
};


SetType.prototype.checkItem = function(context, other, expression) {
	if(other==IntegerType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, other, expression);
	}
};

SetType.prototype.declareItem = function(transpiler, itemType, item) {
    // nothing to do
};


SetType.prototype.transpileItem = function(transpiler, itemType, item) {
    transpiler.append(".item(");
    item.transpile(transpiler);
    transpiler.append("-1)");
};

SetType.prototype.declareContains = function(transpiler, other, container, item) {
    container.declare(transpiler);
    item.declare(transpiler);
};


SetType.prototype.transpileContains = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".has(");
    item.transpile(transpiler);
    transpiler.append(")");
};


SetType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
}


SetType.prototype.declareContainsAllOrAny = function(transpiler, other, container, items) {
    var StrictSet = require("../intrinsic/StrictSet").StrictSet;
    transpiler.require(StrictSet);
    container.declare(transpiler);
    items.declare(transpiler);
};


SetType.prototype.transpileContainsAll = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    items.transpile(transpiler);
    transpiler.append(")");
};


SetType.prototype.transpileContainsAny = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    items.transpile(transpiler);
    transpiler.append(")");
};


SetType.prototype.checkIterator = function(context, source) {
	return this.itemType;
}


SetType.prototype.isAssignableFrom = function(context, other) {
    return ContainerType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof SetType) && this.itemType.isAssignableFrom(context, other.itemType));
};


exports.SetType = SetType;
