var Parameter = require("./Parameter").Parameter;
var MethodType = require("../type/MethodType").MethodType;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
var ArrowValue = require("../value/ArrowValue").ArrowValue;

function MethodParameter(id) {
	Parameter.call(this, id);
	return this;
}

MethodParameter.prototype = Object.create(Parameter.prototype);
MethodParameter.prototype.constructor = MethodParameter;

MethodParameter.prototype.getSignature = function(dialect) {
	return this.name;
};

MethodParameter.prototype.toString = function() {
	return this.name;
};

MethodParameter.prototype.getProto = function() {
	return this.name;
};


MethodParameter.prototype.register = function(context) {
	var actual = context.getRegisteredValue(this.name);
	if(actual!=null) {
		throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
	}
	context.registerValue(this);
};

MethodParameter.prototype.check = function(context) {
	var actual = context.getRegisteredDeclaration(this.name);
	if(actual==null) {
		throw new SyntaxError("Unknown method: \"" + this.name + "\"");
	}
};


MethodParameter.prototype.checkValue = function(context, expression) {
	var isArrow = expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
	return isArrow ? this.checkArrowValue(context, expression) : Parameter.prototype.checkValue.call(this, context, expression);
};


MethodParameter.prototype.checkArrowValue = function(context, expression) {
	return new ArrowValue(this.getDeclaration(context), expression.calling, expression.expression); // TODO check
};


MethodParameter.prototype.getType = function(context) {
    var method = this.getDeclaration(context);
    return new MethodType(method);
};

MethodParameter.prototype.getDeclaration = function(context) {
    var methods = context.getRegisteredDeclaration(this.name);
    if (methods)
        return methods.getFirst();
    else
        return null;
};

MethodParameter.prototype.declare = function(transpiler) {
    // nothing to do ?
};

MethodParameter.prototype.getTranspiledName = function(context) {
    var method = this.getDeclaration(context);
    return method.getTranspiledName(context);
};

MethodParameter.prototype.equals = function(other) {
    return other === this || (other instanceof MethodParameter && this.name === other.name);
};


exports.MethodParameter = MethodParameter;
