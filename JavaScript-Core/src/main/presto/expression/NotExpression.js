var SyntaxError = require("../error/SyntaxError").SyntaxError;
var Value = require("../value/Value").Value;

function NotExpression(expression) {
	this.expression = expression;
	return this;
}

NotExpression.prototype.toString = function() {
    return "not " + this.expression.toString();
};

NotExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
    this.expression.toDialect(writer);
};

NotExpression.prototype.toEDialect = function(writer) {
    writer.append("not ");
};

NotExpression.prototype.toPDialect = function(writer) {
    writer.append("not ");
};

NotExpression.prototype.toODialect = function(writer) {
    writer.append("!");
};


NotExpression.prototype.check = function(context) {
	var type = this.expression.check(context);
	return type.checkNot(context);
};

NotExpression.prototype.interpret = function(context) {
	var val = this.expression.interpret(context);
	return val.Not();
};

exports.NotExpression = NotExpression;
