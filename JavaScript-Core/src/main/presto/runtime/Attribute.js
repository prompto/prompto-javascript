function Attribute (name) {
	this.name = name;
	return this;
}

Attribute.prototype.getType = function(context) {
	var declaration = context.getRegisteredDeclaration(this.name);
	return declaration.getType(context);
};

exports.Attribute = Attribute;
