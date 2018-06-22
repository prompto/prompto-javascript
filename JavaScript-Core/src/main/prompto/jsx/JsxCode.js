var IJsxExpression = require("./IJsxExpression").IJsxExpression;

function JsxCode(expression) {
    IJsxExpression.call(this);
	this.expression = expression;
	return this;
}

JsxCode.prototype = Object.create(IJsxExpression.prototype);
JsxCode.prototype.constructor = JsxCode;


JsxCode.prototype.check = function(context) {
    this.expression.check(context);
    return JsxType.instance;
};

JsxCode.prototype.toDialect = function(writer) {
    writer.append("{");
    this.expression.toDialect(writer);
    writer.append("}");
};

exports.JsxCode = JsxCode;
