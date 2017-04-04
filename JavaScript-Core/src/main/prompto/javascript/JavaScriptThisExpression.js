var JavaScriptExpression = require("./JavaScriptExpression").JavaScriptExpression;
var ThisExpression = require("../expression/ThisExpression").ThisExpression;

function JavaScriptThisExpression() {
    JavaScriptExpression.call(this);
	this.expression = new ThisExpression();
	return this;
}

JavaScriptThisExpression.prototype = Object.create(JavaScriptExpression.prototype);
JavaScriptThisExpression.prototype.constructor = JavaScriptThisExpression;

JavaScriptThisExpression.prototype.interpret = function(context) {
    return this.expression.interpret(context);
};

JavaScriptThisExpression.prototype.toDialect = function(writer) {
    return writer.append("this");
};

JavaScriptThisExpression.prototype.toString = function() {
	return "this";
};

exports.JavaScriptThisExpression = JavaScriptThisExpression;