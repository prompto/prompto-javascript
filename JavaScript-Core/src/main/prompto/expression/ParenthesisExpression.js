var Expression = require("./Expression").Expression;

function ParenthesisExpression(expression) {
    Expression.call(this);
	this.expression = expression;
	return this;
};

ParenthesisExpression.prototype = Object.create(Expression.prototype);
ParenthesisExpression.prototype.constructor = ParenthesisExpression;

ParenthesisExpression.prototype.toString = function() {
	return "(" + this.expression.toString() + ")";
};

ParenthesisExpression.prototype.toDialect = function(writer) {
    writer.append("(");
    this.expression.toDialect(writer);
    writer.append(")");
};


ParenthesisExpression.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
};


ParenthesisExpression.prototype.transpile = function(transpiler) {
    transpiler.append("(");
    this.expression.transpile(transpiler);
    transpiler.append(")");
};


ParenthesisExpression.prototype.check = function(context) {
	return this.expression.check(context);
};

ParenthesisExpression.prototype.interpret = function(context) {
	return this.expression.interpret(context);
};

exports.ParenthesisExpression = ParenthesisExpression;
