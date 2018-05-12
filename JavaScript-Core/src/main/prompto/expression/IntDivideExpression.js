var Value = require("../value/Value").Value;

function IntDivideExpression(left, right) {
	this.left = left;
	this.right = right;
	return this;
}

IntDivideExpression.prototype.toString = function() {
	return this.left.toString() + " \\ " + this.right.toString();
};

IntDivideExpression.prototype.toDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" \\ ");
    this.right.toDialect(writer);
};

IntDivideExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkIntDivide(context,rt);
};

IntDivideExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return lval.IntDivide(context, rval);
};


IntDivideExpression.prototype.transpile = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.transpileIntDivide(transpiler, rt, this.left, this.right);
};


exports.IntDivideExpression = IntDivideExpression;
