var Argument = require("./Argument").Argument;
var IdentifierList = require("../grammar/IdentifierList").IdentifierList;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var utils = require("../utils/index");

function CategoryArgument(type, id, defaultExpression) {
	Argument.call(this, id);
	this.type = type;
    this.defaultExpression = defaultExpression || null;
	return this;
}

CategoryArgument.prototype = Object.create(Argument.prototype);
CategoryArgument.prototype.constructor = CategoryArgument;

CategoryArgument.prototype.getProto = function() {
	return this.type.name;
};

CategoryArgument.prototype.getTranspiledName =  function(context) {
    return this.type.getTranspiledName(context);
};
	
CategoryArgument.prototype.equals = function(other) {
    return other === this || (other instanceof CategoryArgument && utils.equalObjects(this.type, other.type));
};


CategoryArgument.prototype.register = function(context) {
	var actual = context.contextForValue(this.name);
	if(actual===context) {
		throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
	}
	context.registerValue(this);
    if(this.defaultExpression!=null)
        context.setValue(this.id, this.defaultExpression.interpret(context));
};

CategoryArgument.prototype.check = function(context) {
	this.type.checkExists(context);
};

CategoryArgument.prototype.declare = function(transpiler) {
    this.type.declare(transpiler);
};


CategoryArgument.prototype.getType = function(context) {
	return this.type;
};

CategoryArgument.prototype.toEDialect = function(writer) {
    var anonymous = "any"==this.type.name;
    this.type.toDialect(writer);
    if(anonymous) {
        writer.append(' ');
        writer.append(this.name);
    }
    if(!anonymous) {
        writer.append(' ');
        writer.append(this.name);
    }
};

CategoryArgument.prototype.toODialect = function(writer) {
    this.type.toDialect(writer);
    writer.append(' ');
    writer.append(this.name);
};

CategoryArgument.prototype.toMDialect = function(writer) {
    writer.append(this.name);
    writer.append(':');
    this.type.toDialect(writer);
};

exports.CategoryArgument = CategoryArgument;
