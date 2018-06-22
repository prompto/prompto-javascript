var IJsxExpression = require("./IJsxExpression").IJsxExpression;

function JsxExpression(expression) {
    IJsxExpression.call(this);
    this.expression = expression;
	return this;
}


JsxExpression.prototype = Object.create(IJsxExpression.prototype);
JsxExpression.prototype.constructor = JsxExpression;


JsxExpression.prototype.check = function(context) {
	return this.expression.check(context);
};

JsxExpression.prototype.toDialect = function(writer) {
	writer.append("{");
    this.expression.toDialect(writer);
	writer.append("}");
};

exports.JsxExpression = JsxExpression;