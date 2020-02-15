var ContainerType = require("./ContainerType").ContainerType;
var BaseJoinMethodDeclaration = null;
var SetType = null;
var IntegerType = null;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;
var ListValue = require("../value/ListValue").ListValue;
var List = require("../intrinsic/List").List;


exports.resolve = function() {
    IntegerType = require("./IntegerType").IntegerType;
    SetType = require("./SetType").SetType;
    resolveBuiltinMethods();
};

function ListType(itemType) {
    ContainerType.call(this, new Identifier(itemType.name+"[]"), itemType);
	return this;
}
	
ListType.prototype = Object.create(ContainerType.prototype);
ListType.prototype.constructor = ListType;


ListType.prototype.withItemType = function(itemType) {
    return new ListType(itemType);
};


ListType.prototype.declare = function(transpiler) {
    transpiler.register(List);
    this.itemType.declare(transpiler);
};


ListType.prototype.transpile = function(transpiler) {
    transpiler.append('List')
};


ListType.prototype.getTranspiledName = function(context) {
    return this.itemType.getTranspiledName(context) + "_list";
};


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
    if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".add(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


ListType.prototype.checkSubtract= function(context, other) {
    if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
        return this;
    } else {
        return ContainerType.prototype.checkSubtract.call(this, context, other);
    }
};


ListType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareSubtract.call(this, transpiler, other, left, right);
    }
};


ListType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if((other instanceof ListType || other instanceof SetType) && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".remove(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileSubtract.call(this, transpiler, other, left, right);
    }
};


ListType.prototype.checkItem = function(context, itemType, expression) {
	if(itemType==IntegerType.instance) {
		return this.itemType;
	} else {
		return ContainerType.prototype.checkItem.call(this, context, itemType, expression);
	}
};

ListType.prototype.declareItem = function(transpiler, itemType, item) {
    if(itemType===IntegerType.instance) {
        this.itemType.declare(transpiler);
        item.declare(transpiler);
    } else {
        return ContainerType.prototype.declareItem.call(this, transpiler, itemType, item);
    }
};


ListType.prototype.transpileItem = function(transpiler, itemType, item) {
    if(itemType===IntegerType.instance) {
        transpiler.append(".item(");
        item.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileItem.call(this, transpiler, itemType, item);
    }
};


ListType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    transpiler.append(".setItem(");
    item.transpile(transpiler);
    transpiler.append(", ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


ListType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other === IntegerType.instance) {
		return this;
	} else {
		return ContainerType.prototype.checkMultiply.call(this, context, other, tryReverse);
	}
};


ListType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    if(other === IntegerType.instance) {
        var multiplyArray = require("../utils/Utils").multiplyArray;
        transpiler.require(multiplyArray);
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
    }
};


ListType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    if(other === IntegerType.instance) {
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

ListType.prototype.declareContainsAllOrAny = function(transpiler, other, container, items) {
    var StrictSet = require("../intrinsic/StrictSet").StrictSet;
    transpiler.require(StrictSet);
    container.declare(transpiler);
    items.declare(transpiler);
};


ListType.prototype.transpileContainsAll = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    items.transpile(transpiler);
    transpiler.append(")");
};


ListType.prototype.transpileContainsAny = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    items.transpile(transpiler);
    transpiler.append(")");
};


ListType.prototype.checkIterator = function(context, source) {
	return this.itemType;
};


ListType.prototype.getMemberMethods = function(context, name) {
    switch (name) {
        case "join":
            return [new JoinListMethodDeclaration()];
        default:
            return ContainerType.prototype.getMemberMethods.call(context, name);
    }
};


exports.ListType = ListType;


function JoinListMethodDeclaration() {
    BaseJoinMethodDeclaration.call(this);
    return this;
}

function resolveBuiltinMethods() {
    BaseJoinMethodDeclaration = require("./ContainerType").BaseJoinMethodDeclaration;

    JoinListMethodDeclaration.prototype = Object.create(BaseJoinMethodDeclaration.prototype);
    JoinListMethodDeclaration.prototype.constructor = JoinListMethodDeclaration;

    JoinListMethodDeclaration.prototype.getItems = function(context) {
        return this.getValue(context).items;
    };
}
