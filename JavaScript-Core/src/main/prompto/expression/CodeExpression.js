var CodeValue = require("../value/CodeValue").CodeValue;
var CodeType = require("../type/CodeType").CodeType;

function CodeExpression(expression) {
	this.expression = expression;
	return this;
}

CodeExpression.prototype.toString = function() {
	return "Code: " + this.expression.toString();
};

CodeExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

CodeExpression.prototype.toEDialect = function(writer) {
    writer.append("Code: ");
    this.expression.toDialect(writer);
};

CodeExpression.prototype.toODialect = function(writer) {
    writer.append("Code(");
    this.expression.toDialect(writer);
    writer.append(")");
};

CodeExpression.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
};

CodeExpression.prototype.check = function(context) {
	return CodeType.instance;
};

CodeExpression.prototype.interpret = function(context) {
	return new CodeValue(this);
};

CodeExpression.prototype.declare = function(transpiler) {
    // nothing to do
};


CodeExpression.prototype.transpile = function(transpiler) {
    // nothing to do
};


// expression can only be checked and evaluated in the context of an execute:
CodeExpression.prototype.checkCode = function(context) {
	return this.expression.check(context);
};

CodeExpression.prototype.interpretCode = function(context) {
	return this.expression.interpret(context);
};

CodeExpression.prototype.declareCode = function(transpiler) {
    return this.expression.declare(transpiler);
};

CodeExpression.prototype.transpileCode = function(transpiler) {
    return this.expression.transpile(transpiler);
};


exports.CodeExpression = CodeExpression;