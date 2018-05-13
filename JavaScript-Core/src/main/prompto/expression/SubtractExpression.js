var Value = require("../value/Value").Value;

function SubtractExpression(left, right) {
	this.left = left;
	this.right = right;
	return this;
}

SubtractExpression.prototype.toString = function() {
	return this.left.toString() + " - " + this.right.toString();
};

SubtractExpression.prototype.toDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" - ");
    this.right.toDialect(writer);
};



SubtractExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkSubtract(context,rt);
};

SubtractExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
    return lval.Subtract(context, rval);
};

SubtractExpression.prototype.declare = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.declareSubtract(transpiler, rt, this.left, this.right);
};

SubtractExpression.prototype.transpile = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.transpileSubtract(transpiler, rt, this.left, this.right);
};

exports.SubtractExpression = SubtractExpression;



