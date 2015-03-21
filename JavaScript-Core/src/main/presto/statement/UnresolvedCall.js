var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var UnresolvedIdentifier = require("../grammar/UnresolvedIdentifier").UnresolvedIdentifier;
var MethodCall = require("./MethodCall").MethodCall;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var ConstructorExpression = require("../expression/ConstructorExpression").ConstructorExpression;
var CategoryType = require("../type/CategoryType").CategoryType;

function UnresolvedCall(callable, assignments) {
	SimpleStatement.call(this);
	this.resolved = null;
	this.callable = callable;
	this.assignments = assignments || null;
	return this;
}

UnresolvedCall.prototype  = Object.create(SimpleStatement.prototype);
UnresolvedCall.prototype.constructor = UnresolvedCall;

UnresolvedCall.prototype.toDialect = function(writer) {
    try {
        this.resolve(writer.context);
        this.resolved.toDialect(writer);
    } catch(error) {
        this.callable.toDialect(writer);
        if(this.assignments!=null)
           this. assignments.toDialect(writer);
    }
};
	
UnresolvedCall.prototype.check = function(context) {
	this.resolve(context);
	return this.resolved.check(context);
};

UnresolvedCall.prototype.interpret = function(context) {
	this.resolve(context);
	return this.resolved.interpret(context);
};

UnresolvedCall.prototype.resolve = function(context) {
	if(this.resolved===null) {
		if(this.callable instanceof UnresolvedIdentifier) {
			this.resolveGlobal(context);
		} else {
			this.resolveMember(context);
		}
	}
};


UnresolvedCall.prototype.resolveGlobal = function(context) {
	var name = this.callable.name;
	var decl = context.getRegisteredDeclaration(name);
	if(decl===null) {
		throw new SyntaxError("Unknown name:" + name);
	}
	if(decl instanceof CategoryDeclaration) {
		this.resolved = new ConstructorExpression(new CategoryType(name), this.assignments);
	} else {
		this.resolved = new MethodCall(new MethodSelector(null, name), this.assignments);
	}
};

UnresolvedCall.prototype.resolveMember = function(context) {
	this.resolved = new MethodCall(new MethodSelector(this.callable.parent, this.callable.name), this.assignments);
};


exports.UnresolvedCall = UnresolvedCall;