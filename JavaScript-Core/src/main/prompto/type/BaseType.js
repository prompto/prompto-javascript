var SyntaxError = require("../error/SyntaxError").SyntaxError;
var EnumeratedNativeType = null;
var VoidType = null;
var TextType = null;
var NullType = null;
var TupleValue = null;
var SetValue = null;
var ListValue = null;

exports.resolve = function() {
    EnumeratedNativeType = require("./EnumeratedNativeType").EnumeratedNativeType;
    VoidType = require("./VoidType").VoidType;
    TextType = require("./TextType").TextType;
    NullType = require("./NullType").NullType;
    TupleValue = require("../value/TupleValue").TupleValue;
    SetValue = require("../value/SetValue").SetValue;
    ListValue = require("../value/ListValue").ListValue;
};

function BaseType(id) {
	this.id = id;
	return this;
};

Object.defineProperty(BaseType.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});


BaseType.prototype.getTranspiledName = function() {
    return this.name;
};


BaseType.prototype.toString = function() {
	return this.name;
};


BaseType.prototype.equals = function(other) {
    return (other instanceof BaseType) && this.name==other.name;
};


BaseType.prototype.isAssignableFrom = function(context, other) {
    return this==other || this.equals(other) || other.equals(NullType.instance);
};


BaseType.prototype.getMemberMethods = function(context, name) {
    return [];
};


BaseType.prototype.transpile = function(transpiler) {
    throw new Error("Transpile not implemented by " + this.constructor.name);
};


BaseType.prototype.transpileAssignMemberValue = function(transpiler, name, expression) {
    throw new SyntaxError("Cannot transpile assign member value from " + this.name);
};


BaseType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    throw new SyntaxError("Cannot transpile assign item value from " + this.name);
};


BaseType.prototype.checkAdd = function(context, other, tryReverse) {
    if(other instanceof EnumeratedNativeType)
        return this.checkAdd(context, other.derivedFrom, tryReverse);
    else if(tryReverse)
        return other.checkAdd(context, this, false);
    else
	    throw new SyntaxError("Cannot add " + this.name + " to " + other.name);
};


BaseType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.declareAdd(transpiler, other.derivedFrom, tryReverse, left, right);
    else if(tryReverse)
        return other.declareAdd(transpiler, this, false, right, left);
    else
        throw new SyntaxError("Cannot declare add " + this.name + " to " + other.name);
};


BaseType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileAdd(transpiler, other.derivedFrom, tryReverse, left, right);
    else if(tryReverse)
        return other.transpileAdd(transpiler, this, false, right, left);
    else
        throw new SyntaxError("Cannot transpile add " + this.name + " to " + other.name);
};


BaseType.prototype.checkSubtract = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkSubtract(context, other.derivedFrom);
    else
        throw new SyntaxError("Cannot substract " + this.name + " from " + other.name);
};


BaseType.prototype.declareSubtract = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.declareSubtract(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot declare substract " + this.name + " to " + other.name);
};


BaseType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileSubtract(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot transpile substract " + this.name + " to " + other.name);
};


BaseType.prototype.checkDivide = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkDivide(context, other.derivedFrom);
    else
        throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
};


BaseType.prototype.declareDivide = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.declareDivide(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot declare divide " + this.name + " to " + other.name);
};


BaseType.prototype.transpileDivide = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileDivide(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot transpile divide " + this.name + " to " + other.name);
};


BaseType.prototype.checkIntDivide = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkIntDivide(context, other.derivedFrom);
    else
    	throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
};


BaseType.prototype.declareIntDivide = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.declareIntDivide(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot declare int divide " + this.name + " to " + other.name);
};


BaseType.prototype.transpileIntDivide = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileIntDivide(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot transpile int divide " + this.name + " to " + other.name);
};


BaseType.prototype.checkModulo = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkModulo(context, other.derivedFrom);
    else
    	throw new SyntaxError("Cannot modulo " + this.name + " with " + other.name);
};


BaseType.prototype.declareModulo = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.declareModulo(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot declare modulo " + this.name + " to " + other.name);
};

BaseType.prototype.transpileModulo = function(transpiler, other, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileModulo(transpiler, other.derivedFrom, left, right);
    else
        throw new SyntaxError("Cannot transpile modulo " + this.name + " to " + other.name);
};


BaseType.prototype.checkMultiply = function(context, other, tryReverse) {
    if(other instanceof EnumeratedNativeType)
        return this.checkMultiply(context, other.derivedFrom, tryReverse);
    else if(tryReverse)
        return other.checkMultiply(context, this, false);
    else
	    throw new SyntaxError("Cannot multiply " + this.name + " with " + other.name);
};

BaseType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.declareMultiply(transpiler, other.derivedFrom, tryReverse, left, right);
    else if(tryReverse)
        return other.declareMultiply(transpiler, this, false, right, left);
    else
        throw new SyntaxError("Cannot declare multiply " + this.name + " to " + other.name);
};


BaseType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileMultiply(transpiler, other.derivedFrom, tryReverse, left, right);
    else if(tryReverse)
        return other.transpileMultiply(transpiler, this, false, right, left);
    else
        throw new SyntaxError("Cannot transpile multiply " + this.name + " to " + other.name);
};


BaseType.prototype.checkMinus = function(context) {
    if(this instanceof EnumeratedNativeType)
        return this.derivedFrom.checkMinus(context);
    else
	    throw new SyntaxError("Cannot negate " + this.name);
};


BaseType.prototype.declareMinus = function(transpiler, value) {
    if(this instanceof EnumeratedNativeType)
        return this.derivedFrom.declareMinus(transpiler, value);
    else
        throw new SyntaxError("Cannot declare negate " + this.name);
};


BaseType.prototype.transpileMinus = function(transpiler, value) {
    if(this instanceof EnumeratedNativeType)
        return this.derivedFrom.transpileMinus(transpiler, value);
    else
        throw new SyntaxError("Cannot transpile negate of " + this.name );
};


BaseType.prototype.checkCompare = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkCompare(context, other.derivedFrom);
    else
    	throw new SyntaxError("Cannot compare " + this.name + " to " + other.name);
};


BaseType.prototype.declareCompare = function(transpiler, other) {
    if(other instanceof EnumeratedNativeType)
        return this.declareCompare(transpiler, other.derivedFrom);
    else
        throw new SyntaxError(this.name + " cannot declare compare " + other.name);
};


BaseType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileCompare(transpiler, other.derivedFrom, operator, left, right);
    else
        throw new SyntaxError(this.name + " cannot transpile compare " + other.name);
};


BaseType.prototype.checkContains = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkContains(context, other.derivedFrom);
    else
    	throw new SyntaxError(this.name + " cannot contain " + other.name);
};


BaseType.prototype.declareContains = function(transpiler, other, container, item) {
    if(other instanceof EnumeratedNativeType)
        return this.declareContains(transpiler, other.derivedFrom, container, item);
    else
        throw new SyntaxError(this.name + " cannot declare contain " + other.name);
};

BaseType.prototype.transpileContains = function(transpiler, other, container, item) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileContains(transpiler, other.derivedFrom, container, item);
    else
        throw new SyntaxError(this.name + " cannot transpile contain " + other.name);
};


BaseType.prototype.checkContainsAllOrAny = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkContainsAllOrAny(context, other.derivedFrom);
    else
    	throw new SyntaxError(this.name + " cannot contain all or any " + other.name);
};

BaseType.prototype.declareContainsAllOrAny = function(transpiler, other, container, item) {
    if(other instanceof EnumeratedNativeType)
        return this.declareContainsAllOrAny(transpiler, other.derivedFrom, container, item);
    else
        throw new SyntaxError(this.name + " cannot declare contain all or any " + other.name);
};


BaseType.prototype.transpileContainsAll = function(transpiler, other, container, item) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileContainsAll(transpiler, other.derivedFrom, container, item);
    else
        throw new SyntaxError(this.name + " cannot transpile contain all " + other.name);
};

BaseType.prototype.transpileContainsAny = function(transpiler, other, container, item) {
    if(other instanceof EnumeratedNativeType)
        return this.transpileContainsAny(transpiler, other.derivedFrom, container, item);
    else
        throw new SyntaxError(this.name + " cannot transpile contain any " + other.name);
};



BaseType.prototype.checkItem = function(context, itemType) {
    if(itemType instanceof EnumeratedNativeType)
        return this.checkItem(context, itemType.derivedFrom);
    else
    	throw new SyntaxError("Cannot read item from " + this.name);
};


BaseType.prototype.declareItem = function(transpiler, itemType, item) {
    if(itemType instanceof EnumeratedNativeType)
        return this.declareItem(transpiler, itemType.derivedFrom, item);
    else
        throw new SyntaxError("Cannot declare item from: " + this.name);
};

BaseType.prototype.transpileItem = function(transpiler, itemType, item) {
    if(itemType instanceof EnumeratedNativeType)
        return this.transpileItem(transpiler, itemType.derivedFrom);
    else
        throw new SyntaxError("Cannot transpile item from: " + this.name);
};



BaseType.prototype.checkMember = function(context, section, name) {
    if("text" == name)
        return TextType.instance;
    else
        context.problemListener.reportInvalidMember(section, name);
};


BaseType.prototype.declareMember = function(transpiler, name) {
    if("text" !== name)
        throw new SyntaxError("Cannot declare member: " + name + " from " + this.name);
};

BaseType.prototype.transpileMember = function(transpiler, name) {
    if("text" == name)
        transpiler.append("getText()");
    else
        throw new SyntaxError("Cannot transpile member: " + name + " from " + this.name);
};


BaseType.prototype.checkSlice = function(context) {
	throw new SyntaxError("Cannot slice " + this.name);
};


BaseType.prototype.declareSlice = function(transpiler, first, last) {
    throw new SyntaxError("Cannot declare slice for " + this.name);
};


BaseType.prototype.transpileSlice = function(transpiler, first, last) {
    throw new SyntaxError("Cannot transpile slice for " + this.name);
};

BaseType.prototype.checkIterator = function(context, source) {
    context.problemListener.reportCannotIterate(source);
    return VoidType.instance;
};


BaseType.prototype.declareIterator = function(transpiler, name, expression) {
    throw new SyntaxError("Cannot declare iterate over " + this.name);
};

BaseType.prototype.transpileIterator = function(transpiler, name, expression) {
    throw new SyntaxError("Cannot transpile iterate over " + this.name);
};


BaseType.prototype.checkAssignableFrom = function(context, other) {
	if (!this.isAssignableFrom(context, other)) {
		throw new SyntaxError("Type: " + this.name + " is not compatible with: " + other.name);
	};
};

BaseType.prototype.checkRange = function(context, other) {
	throw new SyntaxError("Cannot create range of " + this.name + " and " + other.name);
};

BaseType.prototype.declareRange = function(context, other) {
    throw new SyntaxError("Cannot declare range of " + this.name + " and " + other.name);
};


BaseType.prototype.transpileRange = function(transpiler, first, last) {
    throw new SyntaxError("Cannot transpile range of " + this.name);
};


BaseType.prototype.checkAnd = function(context, other) {
	throw new SyntaxError("Cannot logically combine " + this.name + " and " + other.name);
};

BaseType.prototype.checkOr = function(context, other) {
	throw new SyntaxError("Cannot logically combine " + this.name + " or " + other.name);
};

BaseType.prototype.checkNot = function(context) {
	throw new SyntaxError("Cannot logically negate " + this.name);
};

BaseType.prototype.getMember = function(context, name) {
    throw new SyntaxError("Cannot read member from " + this.name);
};


BaseType.prototype.readJSONValue = function(context, node, parts) {
    throw new Error("Unsupported!")
};


BaseType.prototype.declareSorted = function(transpiler, key) {
    throw new Error("Cannot declare sorted from " + this.name);
};

BaseType.prototype.sort = function(context, list, desc) {
    throw new Error("Unsupported!")
};


BaseType.prototype.doSort = function(context, list, cmp, desc) {
	// only sort if required
	if(list.size()<=1) {
		return list;
	}
    // create result list we can sort in place
    var items = null;
    if( list instanceof ListValue || list instanceof TupleValue) {
        items = [].concat(list.items);
    } else if ( list instanceof SetValue) {
        items = Array.from(list.items.set.values());
    }
    items.sort(cmp);
    if(desc)
        items.reverse(); // TODO optimize
	return new ListValue(list.type.itemType, items);
};

BaseType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
	return value; // TODO for now
};

BaseType.prototype.toDialect = function(writer) {
    writer.append(this.name);
};

exports.BaseType = BaseType;
