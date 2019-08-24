var Expression = require("./Expression").Expression;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Dialect = require("../parser/Dialect").Dialect;
var Value = require("../value/Value").Value;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

function AndExpression(left, right) {
    Expression.call(this);
	this.left = left;
	this.right = right;
	return this;
}

AndExpression.prototype = Object.create(Expression.prototype);
AndExpression.prototype.constructor = AndExpression;

AndExpression.prototype.toString = function() {
	return this.left.toString() + " and " + this.right.toString();
};

AndExpression.prototype.operatorToDialect = function(dialect) {
    switch(dialect) {
        case Dialect.E:
        case Dialect.M:
            return " and ";
        case Dialect.O:
            return " && ";
        default:
            throw new Exception("Unsupported: " + dialect.name);
    }
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

AndExpression.prototype.toMDialect = function(writer) {
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
	if(lval instanceof BooleanValue && !lval.value)
	    return lval;
	var rval = this.right.interpret(context);
	return lval.And(rval);
};


AndExpression.prototype.declare = function(transpiler) {
    this.left.declare(transpiler);
    this.right.declare(transpiler);
};


AndExpression.prototype.transpile = function(transpiler) {
    this.left.transpile(transpiler);
    transpiler.append(" && ");
    this.right.transpile(transpiler);
};

AndExpression.prototype.interpretAssert = function(context, test) {
    var lval = this.left.interpret(context);
    var rval = lval;
    if(lval instanceof BooleanValue && lval.value)
        rval = this.right.interpret(context);
    if(rval==BooleanValue.TRUE)
        return true;
    var expected = this.getExpected(context, test.dialect);
    var actual = lval.toString() + this.operatorToDialect(test.dialect) + rval.toString();
    test.printFailedAssertion(context, expected, actual);
    return false;
};

AndExpression.prototype.getExpected = function(context, dialect, escapeMode) {
    var writer = new CodeWriter(dialect, context);
    writer.escapeMode = escapeMode;
    this.toDialect(writer);
    return writer.toString();
};


AndExpression.prototype.transpileFound = function(transpiler, dialect) {
    transpiler.append("(");
    this.left.transpile(transpiler);
    transpiler.append(") + '").append(this.operatorToDialect(dialect)).append("' + (");
    this.right.transpile(transpiler);
    transpiler.append(")");
};


exports.AndExpression = AndExpression;

