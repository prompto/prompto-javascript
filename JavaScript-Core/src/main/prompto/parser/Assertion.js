var BooleanType = require("../type/BooleanType").BooleanType;
var EqualsExpression = require("../expression/EqualsExpression").EqualsExpression;

function Assertion(expression) {
    this.expression = expression;
    return this;
}

Assertion.prototype.check = function(context) {
    var type = this.expression.check(context);
    if(type!==BooleanType.instance)
        context.problemListener.reportIllegalNonBoolean(this.expression, type);
    if(this.expression instanceof EqualsExpression)
        context = this.expression.downCast(context, false);
    return context;
};

Assertion.prototype.interpretAssert = function(context, test) {
    return this.expression.interpretAssert(context, test);
};

Assertion.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
};


Assertion.prototype.transpile = function(transpiler) {
    this.expression.transpile(transpiler);
};

Assertion.prototype.transpileFound = function(transpiler, dialect) {
    this.expression.transpileFound(transpiler, dialect);
};

Assertion.prototype.toDialect = function(writer) {
    this.expression.toDialect(writer);
};

Assertion.prototype.getExpected = function(context, dialect, escapeMode) {
    return this.expression.getExpected(context, dialect, escapeMode);
};

exports.Assertion = Assertion;