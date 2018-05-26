var ProblemCollector = require("../problem/ProblemCollector").ProblemCollector;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var AttributeArgument = require("./AttributeArgument").AttributeArgument;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
var MethodArgument = require("./MethodArgument").MethodArgument;

function UnresolvedArgument(id) {
	this.id = id;
	this.resolved = null;
	return this;
}

Object.defineProperty(UnresolvedArgument.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});


UnresolvedArgument.prototype.toDialect = function(writer) {
    writer.append(this.name);
};

UnresolvedArgument.prototype.check = function(context) {
	this.resolveAndCheck(context);
};

UnresolvedArgument.prototype.getProto = function() {
	return this.name;
};

UnresolvedArgument.prototype.getType = function(context) {
	this.resolveAndCheck(context);
	return this.resolved.getType(context);
};

UnresolvedArgument.prototype.register = function(context) {
	this.resolveAndCheck(context);
	this.resolved.register(context);
    if(this.defaultExpression!=null)
        context.setValue(this.name, this.defaultExpression.interpret(context));
};

UnresolvedArgument.prototype.checkValue = function(context, value) {
	this.resolveAndCheck(context);
	return this.resolved.checkValue(context, value);
};

UnresolvedArgument.prototype.resolveAndCheck = function(context) {
	if(this.resolved!=null)
		return;
    // ignore problems during resolution
    var listener = context.problemListener;
    context.problemListener = new ProblemCollector();
    // try out various solutions
	var named = context.getRegisteredDeclaration(this.name);
	if(named instanceof AttributeDeclaration) {
		this.resolved = new AttributeArgument(this.id);
	} else if(named instanceof MethodDeclarationMap) {
		this.resolved = new MethodArgument(this.id);
	}
    // restore listener
    context.problemListener = listener;
    if(this.resolved==null)
        context.problemListener.reportUnknownVariable(this.id);
};

UnresolvedArgument.prototype.declare = function(transpiler) {
    this.resolveAndCheck(transpiler.context);
    this.resolved.declare(transpiler);
};

UnresolvedArgument.prototype.transpile = function(transpiler) {
    this.resolveAndCheck(transpiler.context);
    this.resolved.transpile(transpiler);
};

UnresolvedArgument.prototype.transpileCall = function(transpiler, expression) {
    this.resolveAndCheck(transpiler.context);
    this.resolved.transpileCall(transpiler, expression);
};

exports.UnresolvedArgument = UnresolvedArgument;

