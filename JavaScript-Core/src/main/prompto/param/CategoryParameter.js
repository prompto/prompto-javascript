var Parameter = require("./Parameter").Parameter;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var utils = require("../utils/index");

function CategoryParameter(type, id, defaultExpression) {
	Parameter.call(this, id);
	this.type = type;
    this.defaultExpression = defaultExpression || null;
	return this;
}

CategoryParameter.prototype = Object.create(Parameter.prototype);
CategoryParameter.prototype.constructor = CategoryParameter;

CategoryParameter.prototype.getProto = function() {
	return this.type.name;
};

CategoryParameter.prototype.getTranspiledName =  function(context) {
    return this.type.getTranspiledName(context);
};
	
CategoryParameter.prototype.equals = function(other) {
    return other === this || (other instanceof CategoryParameter && utils.equalObjects(this.type, other.type));
};


CategoryParameter.prototype.register = function(context) {
	var actual = context.contextForValue(this.name);
	if(actual===context) {
		throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
	}
	context.registerValue(this);
    if(this.defaultExpression!=null)
        context.setValue(this.id, this.defaultExpression.interpret(context));
};

CategoryParameter.prototype.check = function(context) {
	this.type.checkExists(context);
};

CategoryParameter.prototype.declare = function(transpiler) {
    this.type.declare(transpiler);
};


CategoryParameter.prototype.getType = function(context) {
	return this.type;
};

CategoryParameter.prototype.toEDialect = function(writer) {
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

CategoryParameter.prototype.toODialect = function(writer) {
    this.type.toDialect(writer);
    writer.append(' ');
    writer.append(this.name);
};

CategoryParameter.prototype.toMDialect = function(writer) {
    writer.append(this.name);
    writer.append(':');
    this.type.toDialect(writer);
};

exports.CategoryParameter = CategoryParameter;
