var Parameter = require("./Parameter").Parameter;

function AttributeParameter(id) {
	Parameter.call(this, id);
	return this;
}

AttributeParameter.prototype = Object.create(Parameter.prototype);
AttributeParameter.prototype.constructor = AttributeParameter;


AttributeParameter.prototype.toString = function() {
	return this.id.name;
};

AttributeParameter.prototype.getProto = function() {
	return this.id.name;
};

AttributeParameter.prototype.getTranspiledName =  function(context) {
    return this.id.name;
};


AttributeParameter.prototype.register = function(context) {
	context.registerValue(this, true);
    if(this.defaultExpression!=null) try {
        context.setValue(this.id, this.defaultExpression.interpret(context));
    } catch(error) {
        throw new SyntaxError("Unable to register default value: "+ this.defaultExpression.toString() + " for argument: " + this.name);
    }
};

AttributeParameter.prototype.check = function(context) {
	var actual = context.getRegisteredDeclaration(this.name);
	if(actual==null)
		throw new SyntaxError("Unknown attribute: \"" + this.name + "\"");
};

AttributeParameter.prototype.getType = function(context) {
	var named = context.getRegisteredDeclaration(this.name);
	return named.getType(context);
};

AttributeParameter.prototype.checkValue = function(context, value) {
	var actual = context.getRegisteredDeclaration(this.name);
	return actual.checkValue(context,value);
};

AttributeParameter.prototype.declare = function(transpiler) {
    var decl = transpiler.context.getRegisteredDeclaration(this.name);
    decl.declare(transpiler);
};

AttributeParameter.prototype.transpileCall = function(transpiler, expression) {
    var decl = transpiler.context.getRegisteredDeclaration(this.name);
    if(decl.constraint) {
        transpiler.append("$check_").append(this.name).append("(");
        Parameter.prototype.transpileCall.call(this, transpiler, expression);
        transpiler.append(")");
    } else
        Parameter.prototype.transpileCall.call(this, transpiler, expression);
};

AttributeParameter.prototype.equals = function(other) {
    return other === this || (other instanceof AttributeParameter && this.name === other.name);
};

exports.AttributeParameter = AttributeParameter;