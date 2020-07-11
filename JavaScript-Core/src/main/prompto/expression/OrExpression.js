var Expression = require("./Expression").Expression;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

function OrExpression(left, right) {
    Expression.call(this);
	this.left = left;
	this.right = right;
	return this;
}

OrExpression.prototype = Object.create(Expression.prototype);
OrExpression.prototype.constructor = OrExpression;

OrExpression.prototype.toString = function() {
    return this.left.toString() + " or " + this.right.toString();
};

OrExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

OrExpression.prototype.operatorToDialect = function(dialect) {
    return dialect==Dialect.O ? " || " : " or ";
};

OrExpression.prototype.toEDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(this.operatorToDialect(writer.dialect));
    this.right.toDialect(writer);
};

OrExpression.prototype.toODialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(this.operatorToDialect(writer.dialect));
    this.right.toDialect(writer);
};

OrExpression.prototype.toMDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(this.operatorToDialect(writer.dialect));
    this.right.toDialect(writer);
};

OrExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkOr(context, rt);
};


OrExpression.prototype.checkQuery = function(context) {
    if (!this.left["checkQuery"]) {
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        return;
    }
    this.left.checkQuery(context);
    if (!this.right["checkQuery"]) {
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
        return;
    }
    this.right.checkQuery(context);
};


OrExpression.prototype.declare = function(transpiler) {
    this.left.declare(transpiler);
    this.right.declare(transpiler);
};


OrExpression.prototype.transpile = function(transpiler) {
    this.left.transpile(transpiler);
    transpiler.append(" || ");
    this.right.transpile(transpiler);
};


OrExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return lval.Or(rval);
};

OrExpression.prototype.interpretAssert = function(context, test) {
    var lval = this.left.interpret(context);
    var rval = this.right.interpret(context);
    var result = lval.Or(rval);
    if(result==BooleanValue.TRUE)
        return true;
    var expected = this.getExpected(context, test.dialect);
    var actual = lval.toString() + this.operatorToDialect(test.dialect) + rval.toString();
    test.printFailedAssertion(context, expected, actual);
    return false;
};

OrExpression.prototype.getExpected = function(context, dialect, escapeMode) {
    var writer = new CodeWriter(dialect, context);
    writer.escapeMode = escapeMode;
    this.toDialect(writer);
    return writer.toString();
};


OrExpression.prototype.transpileFound = function(transpiler, dialect) {
    transpiler.append("(");
    this.left.transpile(transpiler);
    transpiler.append(") + '").append(this.operatorToDialect(dialect)).append("' + (");
    this.right.transpile(transpiler);
    transpiler.append(")");
};



OrExpression.prototype.interpretQuery = function(context, query) {
    if (!this.left["interpretQuery"])
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
    this.left.interpretQuery(context, query);
    if (!this.right["interpretQuery"])
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
    this.right.interpretQuery(context, query);
    query.or();
};


OrExpression.prototype.declareQuery = function(transpiler) {
    this.left.declareQuery(transpiler);
    this.right.declareQuery(transpiler);
};


OrExpression.prototype.transpileQuery = function(transpiler, builderName) {
    this.left.transpileQuery(transpiler, builderName);
    this.right.transpileQuery(transpiler, builderName);
    transpiler.append(builderName).append(".or();").newLine();
};


exports.OrExpression = OrExpression;

