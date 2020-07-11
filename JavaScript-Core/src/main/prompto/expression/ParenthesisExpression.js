var Expression = require("./Expression").Expression;

function ParenthesisExpression(expression) {
    Expression.call(this);
	this.expression = expression;
	return this;
}

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


ParenthesisExpression.prototype.checkQuery = function(context) {
    if (!this.expression["checkQuery"]) {
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
        return;
    }
    this.expression.checkQuery(context);
};


ParenthesisExpression.prototype.interpretQuery = function(context, query) {
    if (!this.expression["interpretQuery"])
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
    this.expression.interpretQuery(context, query);
    query.not();
};


ParenthesisExpression.prototype.transpileQuery = function(transpiler, builderName) {
    this.expression.transpileQuery(transpiler, builderName);
};

exports.ParenthesisExpression = ParenthesisExpression;
