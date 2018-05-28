var Argument = require("./Argument").Argument;
var MethodType = require("../type/MethodType").MethodType;

function MethodArgument(id) {
	Argument.call(this, id);
	return this;
}

MethodArgument.prototype = Object.create(Argument.prototype);
MethodArgument.prototype.constructor = MethodArgument;

MethodArgument.prototype.getSignature = function(dialect) {
	return this.name;
};

MethodArgument.prototype.toString = function() {
	return this.name;
};

MethodArgument.prototype.getProto = function() {
	return this.name;
};


MethodArgument.prototype.register = function(context) {
	var actual = context.getRegisteredValue(this.name);
	if(actual!=null) {
		throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
	}
	context.registerValue(this);
};

MethodArgument.prototype.check = function(context) {
	var actual = context.getRegisteredDeclaration(this.name);
	if(actual==null) {
		throw new SyntaxError("Unknown method: \"" + this.name + "\"");
	}
};

MethodArgument.prototype.getType = function(context) {
    var method = this.getDeclaration(context);
    return new MethodType(method);
};

MethodArgument.prototype.getDeclaration = function(context) {
    var methods = context.getRegisteredDeclaration(this.name);
    if (methods)
        return methods.getFirst();
    else
        return null;
};

MethodArgument.prototype.declare = function(transpiler) {
    // nothing to do ?
};

MethodArgument.prototype.getTranspiledName = function(context) {
    var method = this.getDeclaration(context);
    return method.getTranspiledName(context);
};

MethodArgument.prototype.equals = function(other) {
    return other === this || (other instanceof MethodArgument && this.name === other.name);
};


exports.MethodArgument = MethodArgument;
