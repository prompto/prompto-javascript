var Variable = require("../runtime/Variable").Variable;
var LinkedVariable = require("../runtime/LinkedVariable").LinkedVariable;
var Identifier = require("../grammar/Identifier").Identifier;
var Argument = require("../argument/Argument").Argument;
var Dialect = require("../parser/Dialect").Dialect;
var CategoryDeclaration = null;
var MethodType = require("../type/MethodType").MethodType;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var MethodDeclarationMap = null;

exports.resolve = function() {
	CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
}

function InstanceExpression(id) {
	this.id = id;
	return this;
}

Object.defineProperty(InstanceExpression.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

InstanceExpression.prototype.toString = function() {
	return this.name;
};

InstanceExpression.prototype.toDialect = function(writer, requireMethod) {
    if(requireMethod === undefined)
        requireMethod = true;
    if(requireMethod && this.requiresMethod(writer))
        writer.append("Method: ");
    writer.append(this.name);
};

InstanceExpression.prototype.requiresMethod = function(writer) {
    if(writer.dialect!=Dialect.E)
        return false;
    var o = writer.context.getRegistered(this.name);
    if(o instanceof MethodDeclarationMap)
        return true;
    return false;
};

InstanceExpression.prototype.check = function(context) {
	var named = context.getRegistered(this.id.name);
	if (named == null) {
		throw new SyntaxError("Unknown identifier:" + this.id.name);
	} else if (named instanceof Variable) { // local variable
        return named.getType(context);
    } else if(named instanceof LinkedVariable) { // local variable
        return named.getType(context);
	} else if (named instanceof Argument) { // named argument
		return named.getType(context);
	} else if(named instanceof CategoryDeclaration) { // any p with x
		return named.getType(context);
	} else if(named instanceof AttributeDeclaration) { // in category method
		return named.getType(context);
	} else if(named instanceof MethodDeclarationMap) { // global method or closure
		return new MethodType(context, named.getFirst());
	} else
        context.problemListener.reportUnknownVariable(this.id);
};

InstanceExpression.prototype.interpret = function(context) {
	return context.getValue(this.id);
};

exports.InstanceExpression = InstanceExpression;
