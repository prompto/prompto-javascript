var JavaSelectorExpression = require("./JavaSelectorExpression").JavaSelectorExpression;

function JavaItemExpression(item) {
	JavaSelectorExpression.call(this);
	this.item = item || null;
	return this;
}

JavaItemExpression.prototype = Object.create(JavaSelectorExpression.prototype);
JavaItemExpression.prototype.constructor = JavaItemExpression;

JavaItemExpression.prototype.toString = function() {
	return this.parent.toString() + "[" + this.item.toString() + "]";
};

exports.JavaItemExpression = JavaItemExpression;