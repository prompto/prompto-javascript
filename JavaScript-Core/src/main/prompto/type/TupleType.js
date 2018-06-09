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


TupleType.prototype.declareItem = function(transpiler, itemType, item) {
    if(itemType===IntegerType.instance) {
        item.declare(transpiler);
    } else {
        return ContainerType.prototype.declareItem.call(this, transpiler, itemType, item);
    }
};


TupleType.prototype.transpileItem = function(transpiler, itemType, item) {
    if(itemType===IntegerType.instance) {
        transpiler.append("[");
        item.transpile(transpiler);
        transpiler.append("-1]");
    } else {
        return ContainerType.prototype.transpileItem.call(this, transpiler, itemType, item);
    }
};


TupleType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    transpiler.append(".setItem(").append(item).append(", ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


TupleType.prototype.checkMember = function(context, name) {
	if ("count"==name) {
		return IntegerType.instance;
	} else {
		return NativeType.prototype.checkMember.call(this, context, name);
	}
};


TupleType.prototype.declareMember = function(transpiler, name) {
    if ("count" !== name) {
        return NativeType.prototype.declareMember.call(this, transpiler, name);
    }
};

TupleType.prototype.transpileMember = function(transpiler, name) {
    if ("count" == name) {
        transpiler.append("length");
    } else {
        return NativeType.prototype.transpileMember.call(this, transpiler, name);
    }
};


TupleType.prototype.checkAdd = function(context, other, tryReverse) {
	if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
		return this;
	} else {
		return NativeType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};


TupleType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return NativeType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


TupleType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if(other === TupleType.instance || other instanceof ListType || other instanceof SetType) {
        left.transpile(transpiler);
        transpiler.append(".add(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return NativeType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


TupleType.prototype.checkContains = function(context, other) {
	return BooleanType.instance;
};


TupleType.prototype.declareContains = function(transpiler, other, container, item) {
    container.declare(transpiler);
    item.declare(transpiler);
};


TupleType.prototype.transpileContains = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".includes(");
    item.transpile(transpiler);
    transpiler.append(")");
};



TupleType.prototype.declareContainsAllOrAny = function(transpiler, other, container, items) {
    var StrictSet = require("../intrinsic/StrictSet").StrictSet;
    transpiler.require(StrictSet);
    container.declare(transpiler);
    items.declare(transpiler);
};


TupleType.prototype.transpileContainsAll = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    items.transpile(transpiler);
    transpiler.append(")");
};

TupleType.prototype.transpileContainsAny = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    items.transpile(transpiler);
    transpiler.append(")");
};


TupleType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
};

exports.TupleType = TupleType;
