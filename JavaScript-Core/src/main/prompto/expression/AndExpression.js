var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Dialect = require("../parser/Dialect").Dialect;
var Value = require("../value/Value").Value;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

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
    var rval = this.right.interpret(context);
    var result = lval.And(rval);
    if(result==BooleanValue.TRUE)
        return true;
    var expected = this.getExpected(context, test.dialect);
    var actual = lval.toString() + this.operatorToDialect(test.dialect) + rval.toString();
    test.printFailedAssertion(context, expected, actual);
    return false;
};

AndExpression.prototype.getExpected = function(context, dialect) {
    var writer = new CodeWriter(dialect, context);
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

