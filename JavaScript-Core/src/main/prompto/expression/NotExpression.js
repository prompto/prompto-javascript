var Expression = require("./Expression").Expression;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var BooleanType = require("../type/BooleanType").BooleanType;

function NotExpression(expression) {
    Expression.call(this);
	this.expression = expression;
	return this;
}

NotExpression.prototype = Object.create(Expression.prototype);
NotExpression.prototype.constructor = NotExpression;

NotExpression.prototype.toString = function() {
    return "not " + this.expression.toString();
};

NotExpression.prototype.operatorToDialect = function(dialect) {
    return dialect==Dialect.O ? "! ": "not ";
};

NotExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
    this.expression.toDialect(writer);
};

NotExpression.prototype.toEDialect = function(writer) {
    writer.append("not ");
};

NotExpression.prototype.toMDialect = function(writer) {
    writer.append("not ");
};

NotExpression.prototype.toODialect = function(writer) {
    writer.append("!");
};


NotExpression.prototype.check = function (context) {
    var type = this.expression.check(context);
    if (type)
        return type.checkNot(context);
    else {
        context.problemListener.reportError(this, "Could not check expression to negate");
        return BooleanType.instance; // don't propagate error
    }
};


NotExpression.prototype.checkQuery = function(context) {
    if (!this.expression["checkQuery"]) {
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
        return;
    }
    this.expression.checkQuery(context);
};


NotExpression.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
};


NotExpression.prototype.transpile = function(transpiler) {
    transpiler.append("!(");
    this.expression.transpile(transpiler);
    transpiler.append(")");
};


NotExpression.prototype.interpret = function(context) {
	var val = this.expression.interpret(context);
	return val.Not();
};

NotExpression.prototype.interpretAssert = function(context, test) {
    var result = this.interpret(context);
    if(result==BooleanValue.TRUE)
        return true;
    var expected = this.getExpected(context, test.dialect);
    var actual = this.operatorToDialect(test.dialect) + result.toString();
    test.printFailedAssertion(context, expected, actual);
    return false;
};


NotExpression.prototype.interpretQuery = function(context, query) {
    if (!this.expression["interpretQuery"])
        context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
    this.expression.interpretQuery(context, query);
    query.not();
};


NotExpression.prototype.declareQuery = function(transpiler) {
    this.expression.declareQuery(transpiler);
};


NotExpression.prototype.transpileQuery = function(transpiler, builderName) {
    this.expression.transpileQuery(transpiler, builderName);
    transpiler.append(builderName).append(".not();").newLine();
};



NotExpression.prototype.getExpected = function(context, dialect, escapeMode) {
    var writer = new CodeWriter(dialect, context);
    writer.escapeMode = escapeMode;
    this.toDialect(writer);
    return writer.toString();
};

NotExpression.prototype.transpileFound = function(transpiler, dialect) {
    this.transpile(transpiler);
};



exports.NotExpression = NotExpression;
