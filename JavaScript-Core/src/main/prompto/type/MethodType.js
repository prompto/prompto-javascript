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

MethodType.prototype.declare = function(transpiler) {
    // nothing to do
};

exports.MethodType = MethodType;
