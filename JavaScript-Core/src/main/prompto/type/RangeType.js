var ContainerType = require("./ContainerType").ContainerType;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var Identifier = require("../grammar/Identifier").Identifier;
var IntegerType = null;
var BooleanType = null;

exports.resolve = function() {
	IntegerType = require("./IntegerType").IntegerType;
    BooleanType = require("./BooleanType").BooleanType;
};

function RangeType(itemType) {
    ContainerType.call(this, new Identifier(itemType.name+"[..]"),itemType);
	return this;
}

RangeType.prototype = Object.create(ContainerType.prototype);
RangeType.prototype.constructor = RangeType;

RangeType.prototype.checkItem = function(context, other) {
	if (other == IntegerType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, other);
	}
};



RangeType.prototype.declareItem = function(transpiler, itemType, item) {
    // nothing to do
};


RangeType.prototype.transpileItem = function(transpiler, itemType, item) {
    transpiler.append(".item(");
    item.transpile(transpiler);
    transpiler.append(")");
};


RangeType.prototype.checkSlice = function(context) {
	return this;
};


RangeType.prototype.declareSlice = function(transpiler, first, last) {
    if(first) {
        first.declare(transpiler);
    }
    if(last) {
        last.declare(transpiler);
    }
};


RangeType.prototype.transpileSlice = function(transpiler, first, last) {
    transpiler.append(".slice1Based(");
    if(first) {
        first.transpile(transpiler);
    } else
        transpiler.append("null");
    if(last) {
        transpiler.append(",");
        last.transpile(transpiler);
    }
    transpiler.append(")");
};



RangeType.prototype.checkIterator = function(context) {
	return this.itemType;
};


RangeType.prototype.checkContainsAllOrAny = function(context, other) {
    return BooleanType.instance;
};


RangeType.prototype.declareContains = function(transpiler, other, container, item) {
    transpiler.require(StrictSet);
    container.declare(transpiler);
    item.declare(transpiler);
};


RangeType.prototype.transpileContains = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".has(");
    item.transpile(transpiler);
    transpiler.append(")");
};


RangeType.prototype.declareContainsAllOrAny = function(transpiler, other, container, items) {
    transpiler.require(StrictSet);
    container.declare(transpiler);
    items.declare(transpiler);
};


RangeType.prototype.transpileContainsAll = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    items.transpile(transpiler);
    transpiler.append(")");
};

RangeType.prototype.transpileContainsAny = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    items.transpile(transpiler);
    transpiler.append(")");
};


exports.RangeType = RangeType;