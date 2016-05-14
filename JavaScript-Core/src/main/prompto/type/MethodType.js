var BaseType = require("./BaseType").BaseType;

function MethodType(context, method) {
	BaseType.call(this, method.id);
    this.context = context;
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

exports.MethodType = MethodType;
