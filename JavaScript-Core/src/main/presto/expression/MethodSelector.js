var MemberSelector = require("./MemberSelector").MemberSelector;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var NullValue = require("../value/NullValue").NullValue;
var TypeValue = require("../value/TypeValue").TypeValue;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var CategoryType = null;

exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
};

function MethodSelector(parent, name) {
	MemberSelector.call(this, parent,name);
	return this;
}

MethodSelector.prototype = Object.create(MemberSelector.prototype);
MethodSelector.prototype.constructor = MethodSelector;

MethodSelector.prototype.toDialect = function(writer) {
    if(this.parent==null)
        writer.append(this.name);
    else
        MemberSelector.prototype.toDialect.call(this, writer);
};


MethodSelector.prototype.toString = function() {
	if(this.parent==null) {
		return this.name;
	} else {
		return MemberSelector.prototype.toString.call(this) + "." + this.name;
	}
};

MethodSelector.prototype.getCandidates = function(context) {
	if(this.parent===null) {
		return this.getGlobalCandidates(context);
	} else {
		return this.getCategoryCandidates(context);
	}
};

MethodSelector.prototype.getGlobalCandidates = function(context) {
	var actual = context.getRegisteredDeclaration(this.name);
	if(actual===null) {
		throw new SyntaxError("Unknown method: \"" + this.name + "\"");
	}
	var methods = actual.methods || null;
	if(methods!=null) {
		return Object.keys(methods).map(function(key) {return methods[key]});
	} else {
		throw new SyntaxError("Not a method: \"" + this.name + "\"");
	}
};

MethodSelector.prototype.getCategoryCandidates = function(context) {
	var parentType = this.checkParent(context);
	if(!(parentType instanceof CategoryType)) {
		throw new SyntaxError(parent.toString() + " is not a category");
	}
	var cd = context.getRegisteredDeclaration(parentType.name);
	if(cd===null) {
		throw new SyntaxError("Unknown category:" + parentType.name);
	}
	return cd.findMemberMethods(context, this.name);
};

MethodSelector.prototype.newLocalContext = function(context) {
	if(this.parent==null) {
		return context.newLocalContext();
	} else {
		return this.newInstanceContext(context);
	}
};

MethodSelector.prototype.newLocalCheckContext = function(context) {
    if (this.parent == null) {
        return context.newLocalContext();
    } else {
        return this.newInstanceCheckContext(context);
    }
};

MethodSelector.prototype.newInstanceCheckContext = function(context) {
    var type = this.parent.check (context);
    if (!(type instanceof CategoryType))
        throw new SyntaxError ("Not an instance !");
    context = context.newInstanceContext (null, type);
    return context.newChildContext ();
};


MethodSelector.prototype.newInstanceContext = function(context) {
	var value = this.parent.interpret(context);
	if(value==null || value==NullValue.instance) {
		throw new NullReferenceError();
	}
    if(value instanceof TypeValue && value.value instanceof CategoryType)
        value = context.loadSingleton(value.value);
	if(!(value instanceof ConcreteInstance)) {
		throw new InvalidDataError("Not an instance !");
	}
	context = context.newInstanceContext(value, null);
	return context.newChildContext();
};



exports.MethodSelector = MethodSelector;

