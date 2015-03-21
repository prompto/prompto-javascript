var SyntaxError = require("../error/SyntaxError").SyntaxError;
var Value = require("../value/Value").Value;

function AndExpression(left, right) {
	this.left = left;
	this.right = right;
	return this;
}

AndExpression.prototype.toString = function() {
	return this.left.toString() + " and " + this.right.toString();
};

AndExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

AndExpression.prototype.toEDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" and ");
    this.right.toDialect(writer);
};

AndExpression.prototype.toODialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" && ");
    this.right.toDialect(writer);
};

AndExpression.prototype.toPDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" and ");
    this.right.toDialect(writer);
};


AndExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkAnd(context, rt);
};

AndExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return lval.And(rval);
};

exports.AndExpression = AndExpression;

