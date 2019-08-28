var Expression = require("./Expression").Expression;

function PlusExpression(left, right) {
	Expression.call(this);
	this.left = left;
	this.right = right;
	return this;
}

PlusExpression.prototype = Object.create(Expression.prototype);
PlusExpression.prototype.constructor = PlusExpression;

PlusExpression.prototype.toString = function() {
	return this.left.toString() + " + " + this.right.toString();
};

PlusExpression.prototype.toDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" + ");
    this.right.toDialect(writer);
};


PlusExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkAdd(context,rt, true);
};

PlusExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return lval.Add(context, rval);
};

PlusExpression.prototype.declare = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    lt.declareAdd(transpiler, rt, true, this.left, this.right);
};

PlusExpression.prototype.transpile = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.transpileAdd(transpiler, rt, true, this.left, this.right);
};

exports.PlusExpression = PlusExpression;

