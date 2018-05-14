var Value = require("../value/Value").Value;

function MinusExpression(expression) {
	this.expression = expression;
	return this;
}

MinusExpression.prototype.toString = function() {
	return "-" + this.expression.toString();
};

MinusExpression.prototype.toDialect = function(writer) {
    writer.append("-");
    this.expression.toDialect(writer);
};

MinusExpression.prototype.check = function(context) {
	var type = this.expression.check(context);
	return type.checkMinus(context);
};

MinusExpression.prototype.interpret = function(context) {
	var val = this.expression.interpret(context);
	return val.Minus(context);
};


MinusExpression.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
    var type = this.expression.check(transpiler.context);
    return type.declareMinus(transpiler, this.expression);
};

MinusExpression.prototype.transpile = function(transpiler) {
    var type = this.expression.check(transpiler.context);
    return type.transpileMinus(transpiler, this.expression);
};

exports.MinusExpression = MinusExpression;