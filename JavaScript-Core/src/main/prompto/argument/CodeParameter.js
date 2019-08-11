var CodeType = require("../type/CodeType").CodeType;
var Parameter = require("./Parameter").Parameter;

function CodeParameter(id) {
	Parameter.call(this, id);
	return this;
}

CodeParameter.prototype = Object.create(Parameter.prototype);
CodeParameter.prototype.constructor = CodeParameter;


CodeParameter.prototype.getProto = function() {
	return CodeType.instance.name;
};


CodeParameter.prototype.register = function(context) {
	var actual = context.getRegisteredValue(this.name);
	if(actual!=null) {
		throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
	}
	context.registerValue(this);
};

CodeParameter.prototype.check = function(context) {
	// nothing to do
};

CodeParameter.prototype.declare = function(transpiler) {
    // nothing to do
};

CodeParameter.prototype.getType = function(context) {
	return CodeType.instance;
};

CodeParameter.prototype.toDialect = function(writer) {
    writer.append(CodeType.instance.name);
    writer.append(" ");
    writer.append(this.name);
};


exports.CodeParameter = CodeParameter;