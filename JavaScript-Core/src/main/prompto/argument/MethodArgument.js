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

MethodArgument.prototype.getProto = function(context) {
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
    var actual = context.getRegisteredDeclaration(this.name).getFirst();
	return new MethodType(context, actual);
};

exports.MethodArgument = MethodArgument;
