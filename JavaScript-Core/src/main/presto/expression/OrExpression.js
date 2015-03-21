var SyntaxError = require("../error/SyntaxError").SyntaxError;
var Value = require("../value/Value").Value;

function OrExpression(left, right) {
	this.left = left;
	this.right = right;
	return this;
}

OrExpression.prototype.toString = function() {
    return this.left.toString() + " or " + this.right.toString();
};

OrExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

OrExpression.prototype.toEDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" or ");
    this.right.toDialect(writer);
};

OrExpression.prototype.toODialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" || ");
    this.right.toDialect(writer);
};

OrExpression.prototype.toPDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" or ");
    this.right.toDialect(writer);
};

OrExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkOr(context, rt);
};

OrExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return lval.Or(rval);
};

exports.OrExpression = OrExpression;

