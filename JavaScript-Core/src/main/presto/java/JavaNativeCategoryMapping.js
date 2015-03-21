var NativeCategoryMapping = require("./../grammar/NativeCategoryMapping").NativeCategoryMapping;

function JavaNativeCategoryMapping(expression) {
	NativeCategoryMapping.call(this);
	this.expression = expression;
	return this;
}

JavaNativeCategoryMapping.prototype = Object.create(NativeCategoryMapping.prototype);
JavaNativeCategoryMapping.prototype.creator = JavaNativeCategoryMapping;

JavaNativeCategoryMapping.prototype.toDialect = function(writer) {
    writer.append("Java: ");
    this.expression.toDialect(writer);
};

exports.JavaNativeCategoryMapping = JavaNativeCategoryMapping;