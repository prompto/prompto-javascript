var ContainerType = require("./ContainerType").ContainerType;
var SetType = null;
var IntegerType = null;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;
var ListValue = require("../value/ListValue").ListValue;

exports.resolve = function() {
    IntegerType = require("./IntegerType").IntegerType;
    SetType = require("./SetType").SetType;
};

function ListType(itemType) {
    ContainerType.call(this, new Identifier(itemType.name+"[]"), itemType);
	return this;
}
	
ListType.prototype = Object.create(ContainerType.prototype);
ListType.prototype.constructor = ListType;

ListType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    var values = value.map(function(item) {
        return this.itemType.convertJavaScriptValueToPromptoValue(context, item, null);
    }, this);
    return new ListValue(this.itemType, values);
};

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
	if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
		return this;
	} else {
		return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
	}
};


ListType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


ListType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof ListType && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".concat(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else if(other instanceof SetType && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".concat(Array.from(");
        right.transpile(transpiler);
        transpiler.append(".values()))");
    } else {
        return ContainerType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


ListType.prototype.checkItem = function(context, itemType) {
	if(itemType==IntegerType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, itemType);
	}
};

ListType.prototype.declareItem = function(transpiler, itemType, item) {
    if(itemType===IntegerType.instance) {
        item.declare(transpiler);
    } else {
        return ContainerType.prototype.declareItem.call(this, context, itemType, item);
    }
};


ListType.prototype.transpileItem = function(transpiler, itemType, item) {
    if(itemType===IntegerType.instance) {
        transpiler.append("[");
        item.transpile(transpiler);
        transpiler.append("-1]");
    } else {
        return ContainerType.prototype.transpileItem.call(this, context, itemType, item);
    }
};


ListType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return this;
	} else {
		return ContainerType.prototype.checkMultiply.call(this, context, other, tryReverse);
	}
};


ListType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof IntegerType) {
        var multiplyArray = require("../utils/Utils").multiplyArray;
        transpiler.require(multiplyArray);
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
    }
};


ListType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof IntegerType) {
        transpiler.append("multiplyArray(");
        left.transpile(transpiler);
        transpiler.append(",");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
    }
};

ListType.prototype.checkSlice = function(context) {
	return this;
};


ListType.prototype.declareSlice = function(transpiler, first, last) {
    // nothing to do
};


ListType.prototype.transpileSlice = function(transpiler, first, last) {
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


ListType.prototype.declareContains = function(transpiler, other, container, item) {
    container.declare(transpiler);
    item.declare(transpiler);
};


ListType.prototype.transpileContains = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".includes(");
    item.transpile(transpiler);
    transpiler.append(")");
};


ListType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
};

ListType.prototype.declareContainsAllOrAny = function(transpiler, other, container, item) {
    var StrictSet = require("../intrinsic/StrictSet").StrictSet;
    transpiler.require(StrictSet);
    container.declare(transpiler);
    item.declare(transpiler);
};


ListType.prototype.transpileContainsAll = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    item.transpile(transpiler);
    transpiler.append(")");
};


ListType.prototype.transpileContainsAny = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    item.transpile(transpiler);
    transpiler.append(")");
};

ListType.prototype.checkIterator = function(context) {
	return this.itemType;
};



exports.ListType = ListType;
