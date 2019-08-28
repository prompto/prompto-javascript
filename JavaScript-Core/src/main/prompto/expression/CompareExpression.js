var Expression = require("./Expression").Expression;
var UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var MemberSelector = require("./MemberSelector").MemberSelector;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var Instance = require("../value/Value").Instance;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var MatchOp = require("../store/MatchOp").MatchOp;
var CmpOp = require("../grammar/CmpOp").CmpOp;

function CompareExpression(left, operator, right) {
    Expression.call(this);
	this.left = left;
	this.operator = operator;
	this.right = right;
	return this;
}


CompareExpression.prototype = Object.create(Expression.prototype);
CompareExpression.prototype.constructor = CompareExpression;


CompareExpression.prototype.toString = function() {
	return this.left.toString() + " " + this.operator.toString() + " " + this.right.toString();
};

CompareExpression.prototype.toDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" ");
    this.operator.toDialect(writer);
    writer.append(" ");
    this.right.toDialect(writer);
};

CompareExpression.prototype.check = function(context) {
	var lt = this.left.check(context);
	var rt = this.right.check(context);
	return lt.checkCompare(context, rt, this);
};

CompareExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return this.compare(context, lval, rval);
};

CompareExpression.prototype.declare = function(transpiler) {
    this.left.declare(transpiler);
    this.right.declare(transpiler);
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.declareCompare(transpiler, rt);
};


CompareExpression.prototype.transpile = function(transpiler) {
    var lt = this.left.check(transpiler.context);
    var rt = this.right.check(transpiler.context);
    return lt.transpileCompare(transpiler, rt, this.operator, this.left, this.right);
};

CompareExpression.prototype.compare = function(context, lval, rval) {
	var cmp = lval.compareToValue(context, rval);
	switch (this.operator) {
		case CmpOp.GT:
			return BooleanValue.ValueOf(cmp > 0);
		case CmpOp.LT:
			return BooleanValue.ValueOf(cmp < 0);
		case CmpOp.GTE:
			return BooleanValue.ValueOf(cmp >= 0);
		case CmpOp.LTE:
			return BooleanValue.ValueOf(cmp <= 0);
		default:
            context.problemListener.reportIllegalOperand();
			// throw new SyntaxError("Illegal operand: " + this.operator.toString());
	}
};


CompareExpression.prototype.interpretAssert = function(context, test) {
    var lval = this.left.interpret(context);
    var rval = this.right.interpret(context);
    var result = this.compare(context, lval, rval);
    if(result==BooleanValue.TRUE)
        return true;
    var expected = this.getExpected(context, test.dialect);
    var actual = lval.toString() + this.operator.toString() + rval.toString();
    test.printFailedAssertion(context, expected, actual);
    return false;
};


CompareExpression.prototype.getExpected = function(context, dialect, escapeMode) {
    var writer = new CodeWriter(dialect, context);
    writer.escapeMode = escapeMode;
    this.toDialect(writer);
    return writer.toString();
};


CompareExpression.prototype.transpileFound = function(transpiler, dialect) {
    transpiler.append("(");
    this.left.transpile(transpiler);
    transpiler.append(") + '").append(this.operator.toString()).append("' + (");
    this.right.transpile(transpiler);
    transpiler.append(")");
};



CompareExpression.prototype.interpretQuery = function(context, query) {
    var name = null;
    var value = null;
    if (this.left instanceof UnresolvedIdentifier || this.left instanceof InstanceExpression || this.left instanceof MemberSelector) {
        name = this.left.name;
        value = this.right.interpret(context);
    } else if (this.right instanceof UnresolvedIdentifier || this.right instanceof InstanceExpression || this.right instanceof MemberSelector) {
        name = this.right.name;
        value = this.left.interpret(context);
    }
    if (name == null)
        throw new SyntaxError("Unable to interpret predicate");
    else {
        var decl = context.findAttribute(name);
        var info = decl == null ? null : decl.getAttributeInfo();
        if (value instanceof Instance)
            value = value.getMemberValue(context, "dbId", false);
        var matchOp = this.getMatchOp();
        query.verify(info, matchOp, value == null ? null : value.getStorableData());
        if (this.operator == CmpOp.GTE || this.operator==CmpOp.LTE)
            query.not();
    }
};

CompareExpression.prototype.transpileQuery = function(transpiler, builder) {
    var name = null;
    var value = null;
    if (this.left instanceof UnresolvedIdentifier || this.left instanceof InstanceExpression || this.left instanceof MemberSelector) {
        name = this.left.name;
        value = this.right;
    } else if (this.right instanceof UnresolvedIdentifier || this.right instanceof InstanceExpression || this.right instanceof MemberSelector) {
        name = this.right.name;
        value = this.left;
    }
    var decl = transpiler.context.findAttribute(name);
    var info = decl == null ? null : decl.getAttributeInfo();
    var matchOp = this.getMatchOp();
    // TODO check for dbId field of instance value
    transpiler.append(builder).append(".verify(").append(info.toTranspiled()).append(", MatchOp.").append(matchOp.name).append(", ");
    value.transpile(transpiler);
    transpiler.append(");").newLine();
    if (this.operator == CmpOp.GTE || this.operator==CmpOp.LTE)
        transpiler.append(builder).append(".not();").newLine();
};

CompareExpression.prototype.getMatchOp = function() {
    if (this.operator == CmpOp.GT || this.operator == CmpOp.LTE)
        return MatchOp.GREATER;
    else if (this.operator == CmpOp.GTE || this.operator == CmpOp.LT)
        return MatchOp.LESSER;
    else
        throw new InvalidDataError(this.operator.toString());
};


exports.CompareExpression = CompareExpression;