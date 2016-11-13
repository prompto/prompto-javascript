var SyntaxError = require("../error/SyntaxError").SyntaxError;
var EnumeratedNativeType = null;
var NullType = null;
var TupleValue = null;
var SetValue = null;
var ListValue = null;

exports.resolve = function() {
    EnumeratedNativeType = require("./EnumeratedNativeType").EnumeratedNativeType;
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


BaseType.prototype.toString = function() {
	return this.name;
};


BaseType.prototype.equals = function(other) {
    return (other instanceof BaseType) && this.name==other.name;
};


BaseType.prototype.isAssignableFrom = function(context, other) {
    return this==other || this.equals(other) || other.equals(NullType.instance);
};


BaseType.prototype.checkAdd = function(context, other, tryReverse) {
    if(other instanceof EnumeratedNativeType)
        return this.checkAdd(context, other.derivedFrom, tryReverse);
    else if(tryReverse)
        return other.checkAdd(context, this, false);
    else
	    throw new SyntaxError("Cannot add " + this.name + " to " + other.name);
};


BaseType.prototype.checkSubstract = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkSubstract(context, other.derivedFrom);
    else
        throw new SyntaxError("Cannot substract " + this.name + " from " + other.name);
};


BaseType.prototype.checkDivide = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkDivide(context, other.derivedFrom);
    else
        throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
};


BaseType.prototype.checkIntDivide = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkIntDivide(context, other.derivedFrom);
    else
    	throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
};

BaseType.prototype.checkModulo = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkModulo(context, other.derivedFrom);
    else
    	throw new SyntaxError("Cannot modulo " + this.name + " with " + other.name);
};

BaseType.prototype.checkMultiply = function(context, other, tryReverse) {
    if(other instanceof EnumeratedNativeType)
        return this.checkMultiply(context, other.derivedFrom, tryReverse);
    else if(tryReverse)
        return other.checkMultiply(context, this, false);
    else
	    throw new SyntaxError("Cannot multiply " + this.name + " with " + other.name);
};

BaseType.prototype.checkMinus = function(context) {
	throw new SyntaxError("Cannot negate " + this.name);
};

BaseType.prototype.checkCompare = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkCompare(context, other.derivedFrom);
    else
    	throw new SyntaxError("Cannot compare " + this.name + " to " + other.name);
};


BaseType.prototype.checkContains = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkContains(context, other.derivedFrom);
    else
    	throw new SyntaxError(this.name + " cannot contain " + other.name);
};


BaseType.prototype.checkContainsAllOrAny = function(context, other) {
    if(other instanceof EnumeratedNativeType)
        return this.checkContainsAllOrAny(context, other.derivedFrom);
    else
    	throw new SyntaxError(this.name + " cannot contain " + other.name);
};


BaseType.prototype.checkItem = function(context, itemType) {
    if(itemType instanceof EnumeratedNativeType)
        return this.checkItem(context, itemType.derivedFrom);
    else
    	throw new SyntaxError("Cannot read item from " + this.name);
};


BaseType.prototype.checkMember = function(context, name) {
	throw new SyntaxError("Cannot read member from " + this.name);
};


BaseType.prototype.checkSlice = function(context) {
	throw new SyntaxError("Cannot slice " + this.name);
};


BaseType.prototype.checkIterator = function(context) {
	throw new SyntaxError("Cannot iterate over " + this.name);
};


BaseType.prototype.checkAssignableFrom = function(context, other) {
	if (!this.isAssignableFrom(context, other)) {
		throw new SyntaxError("Type: " + this.name + " is not compatible with: " + other.name);
	};
};

BaseType.prototype.checkRange = function(context, other) {
	throw new SyntaxError("Cannot create range of " + this.name + " and " + other.name);
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


BaseType.prototype.sort = function(context, list, desc) {
    throw new Error("Unsupported!")
};


BaseType.prototype.doSort = function(context, list, cmp, desc) {
	// only sort if required
	if(list.size()<=1) {
		return list;
	}
    // create result list we can sort in place
    var items = [];
    if( list instanceof ListValue || list instanceof TupleValue) {
        items = items.concat(list.items);
    } else if ( list instanceof SetValue) {
        for(var name in list.items)
            items.push(list.items[name]);
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
