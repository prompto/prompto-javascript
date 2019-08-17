var BaseType = require("./BaseType").BaseType;

function MethodType(method) {
	BaseType.call(this, method.id);
    this.method = method;
	return this;
}

MethodType.prototype = Object.create(BaseType.prototype);
MethodType.prototype.constructor = MethodType;


MethodType.prototype.equals = function(other) {
	return (other==this) ||
        ((other instanceof MethodType) && (this.method.getProto()==other.method.getProto()));
};

MethodType.prototype.checkUnique = function(context) {
	var actual = context.getRegisteredDeclaration(this.name);
	if (actual != null) {
		throw new SyntaxError("Duplicate name: \"" + this.name + "\"");
	}
};


MethodType.prototype.isMoreSpecificThan = function(context, other) {
    return false;
};


MethodType.prototype.checkArrowExpression = function(expression) {
	return this; // TODO check
};


MethodType.prototype.declare = function(transpiler) {
    // nothing to do
};


MethodType.prototype.declareArrowExpression = function(transpiler, expression) {
	transpiler = transpiler.newChildTranspiler(null);
	this.method.registerParameters(transpiler.context);
	expression.declare(transpiler);
};


MethodType.prototype.transpileArrowExpression = function(transpiler, expression) {
	transpiler = transpiler.newChildTranspiler(null);
	transpiler.append("function(");
	this.method.parameters.transpile(transpiler);
	transpiler.append(") {");
	this.method.registerParameters(transpiler.context);
	expression.transpile(transpiler);
	transpiler.append("}");
	transpiler.flush();
};

exports.MethodType = MethodType;
