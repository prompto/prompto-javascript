var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var UnresolvedIdentifier = require("../grammar/UnresolvedIdentifier").UnresolvedIdentifier;
var MethodCall = require("./MethodCall").MethodCall;
var MemberSelector = require("../expression/MemberSelector").MemberSelector;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var ConstructorExpression = require("../expression/ConstructorExpression").ConstructorExpression;
var CategoryType = require("../type/CategoryType").CategoryType;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var InstanceContext = require("../runtime/Context").InstanceContext;

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

UnresolvedCall.prototype.interpretAssert = function(context, testMethodDeclaration) {
    this.resolve(context);
    if (this.resolved.interpretAssert)
        return this.resolved.interpretAssert(context, testMethodDeclaration);
    else {
        var writer = new CodeWriter(this.dialect, context);
        this.resolved.toDialect(writer);
        throw new SyntaxError("Cannot test '" + writer.toString() + "'");
    }
};

UnresolvedCall.prototype.resolve = function(context) {
	if(this.resolved===null) {
		if(this.callable instanceof UnresolvedIdentifier) {
            this.resolved = this.resolveUnresolvedIdentifier(context);
		} else if (this.callable instanceof MemberSelector) {
            this.resolved = this.resolveMember(context);
		}
	}
};


UnresolvedCall.prototype.resolveUnresolvedIdentifier = function(context) {
	var id = this.callable.id;
    var call, decl = null;
    // if this happens in the context of a member method, then we need to check for category members first
    if(context.parent instanceof InstanceContext) {
        decl = this.resolveUnresolvedMember(context.parent, id.name);
        if(decl!=null)
            call = new MethodCall(new MethodSelector(null, id), this.assignments);
    }
    if(call==null) {
        decl = context.getRegisteredDeclaration(id.name);
        if (decl === null) {
            if (context.problemListener)
                context.problemListener.reportUnknownMethod(id);
            else
                throw new SyntaxError("Unknown name:" + id.name);
        }
        if (decl instanceof CategoryDeclaration) {
            call = new ConstructorExpression(new CategoryType(id), false, this.assignments);
        } else {
            call = new MethodCall(new MethodSelector(null, id), this.assignments);
        }
    }
    call.copySectionFrom(this);
    return call;
};

UnresolvedCall.prototype.resolveUnresolvedMember = function(context, name) {
    var decl = context.getRegisteredDeclaration(context.instanceType.name);
    var methods = decl.findMemberMethods(context, name);
    if(methods!=null && methods.length>0)
        return methods;
    else
        return null;
};


UnresolvedCall.prototype.resolveMember = function(context) {
	return new MethodCall(new MethodSelector(this.callable.parent, this.callable.id), this.assignments);
};


exports.UnresolvedCall = UnresolvedCall;