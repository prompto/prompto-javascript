var CodeType = require("../type/CodeType").CodeType;
var Argument = require("./Argument").Argument;

function CodeArgument(id) {
	Argument.call(this, id);
	return this;
}

CodeArgument.prototype = Object.create(Argument.prototype);
CodeArgument.prototype.constructor = CodeArgument;


CodeArgument.prototype.getProto = function() {
	return CodeType.instance.name;
};


CodeArgument.prototype.register = function(context) {
	var actual = context.getRegisteredValue(this.name);
	if(actual!=null) {
		throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
	}
	context.registerValue(this);
};

CodeArgument.prototype.check = function(context) {
	// nothing to do
};

CodeArgument.prototype.declare = function(transpiler) {
    // nothing to do
};

CodeArgument.prototype.getType = function(context) {
	return CodeType.instance;
};

CodeArgument.prototype.toDialect = function(writer) {
    writer.append(CodeType.instance.name);
    writer.append(" ");
    writer.append(this.name);
};


exports.CodeArgument = CodeArgument;