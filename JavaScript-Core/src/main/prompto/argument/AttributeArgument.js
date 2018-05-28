var Argument = require("./Argument").Argument;

function AttributeArgument(id) {
	Argument.call(this, id);
	return this;
}

AttributeArgument.prototype = Object.create(Argument.prototype);
AttributeArgument.prototype.constructor = AttributeArgument;


AttributeArgument.prototype.toString = function() {
	return this.id.name;
};

AttributeArgument.prototype.getProto = function() {
	return this.id.name;
};

AttributeArgument.prototype.getTranspiledName =  function(context) {
    return this.id.name;
};


AttributeArgument.prototype.register = function(context) {
	context.registerValue(this, true);
    if(this.defaultExpression!=null) try {
        context.setValue(name, this.defaultExpression.interpret(context));
    } catch(error) {
        throw new SyntaxError("Unable to register default value: "+ this.defaultExpression.toString() + " for argument: " + this.name);
    }
};

AttributeArgument.prototype.check = function(context) {
	var actual = context.getRegisteredDeclaration(this.name);
	if(actual==null)
		throw new SyntaxError("Unknown attribute: \"" + this.name + "\"");
};

AttributeArgument.prototype.getType = function(context) {
	var named = context.getRegisteredDeclaration(this.name);
	return named.getType(context);
};

AttributeArgument.prototype.checkValue = function(context, value) {
	var actual = context.getRegisteredDeclaration(this.name);
	return actual.checkValue(context,value);
};

AttributeArgument.prototype.declare = function(transpiler) {
    var decl = transpiler.context.getRegisteredDeclaration(this.name);
    decl.declare(transpiler);
};

AttributeArgument.prototype.transpileCall = function(transpiler, expression) {
    var decl = transpiler.context.getRegisteredDeclaration(this.name);
    if(decl.constraint) {
        transpiler.append("$check_").append(this.name).append("(");
        Argument.prototype.transpileCall.call(this, transpiler, expression);
        transpiler.append(")");
    } else
        Argument.prototype.transpileCall.call(this, transpiler, expression);
};

AttributeArgument.prototype.equals = function(other) {
    return other === this || (other instanceof AttributeArgument && this.name === other.name);
};

exports.AttributeArgument = AttributeArgument;