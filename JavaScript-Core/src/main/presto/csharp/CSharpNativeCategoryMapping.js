var NativeCategoryMapping = require("./../grammar/NativeCategoryMapping").NativeCategoryMapping;

function CSharpNativeCategoryMapping(expression) {
	NativeCategoryMapping.call(this);
	this.expression = expression;
	return this;
}

CSharpNativeCategoryMapping.prototype = Object.create(NativeCategoryMapping.prototype);
CSharpNativeCategoryMapping.prototype.constructor = CSharpNativeCategoryMapping;

CSharpNativeCategoryMapping.prototype.toDialect = function(writer) {
    writer.append("C#: ");
    this.expression.toDialect(writer);
};

exports.CSharpNativeCategoryMapping = CSharpNativeCategoryMapping;
