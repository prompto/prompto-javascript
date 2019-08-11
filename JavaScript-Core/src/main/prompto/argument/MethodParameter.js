var Parameter = require("./Parameter").Parameter;
var MethodType = require("../type/MethodType").MethodType;

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
