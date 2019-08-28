var Expression = require("./Expression").Expression;

function DivideExpression(left, right) {
	Expression.call(this);
	this.left = left;
	this.right = right;
	return this;
}


DivideExpression.prototype = Object.create(Expression.prototype);
DivideExpression.prototype.constructor = DivideExpression;


DivideExpression.prototype.toString = function() {
	return this.left.toString() + " / " + this.right.toString();
};

DivideExpression.prototype.toDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" / ");
    this.right.toDialect(writer);
};


DivideExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkDivide(context,rt);
};

DivideExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return lval.Divide(context, rval);
};


DivideExpression.prototype.declare = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.declareDivide(transpiler, rt, this.left, this.right);
};


DivideExpression.prototype.transpile = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.transpileDivide(transpiler, rt, this.left, this.right);
};

exports.DivideExpression = DivideExpression;