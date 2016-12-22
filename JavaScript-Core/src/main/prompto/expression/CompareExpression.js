var UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var MemberSelector = require("./MemberSelector").MemberSelector;
var Instance = require("../value/Value").Instance;
var Value = require("../value/Value").Value;
var Bool = require("../value/Bool").Bool;
var MatchOp = require("../store/MatchOp").MatchOp;
var CmpOp = require("../grammar/CmpOp").CmpOp;

function CompareExpression(left, operator, right) {
	this.left = left;
	this.operator = operator;
	this.right = right;
	return this;
}

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
	return lt.checkCompare(context,rt);
};

CompareExpression.prototype.interpret = function(context) {
	var lval = this.left.interpret(context);
	var rval = this.right.interpret(context);
	return this.compare(context, lval, rval);
};

CompareExpression.prototype.compare = function(context, lval, rval) {
	var cmp = lval.CompareTo(context, rval);
	switch (this.operator) {
		case CmpOp.GT:
			return Bool.ValueOf(cmp > 0);
		case CmpOp.LT:
			return Bool.ValueOf(cmp < 0);
		case CmpOp.GTE:
			return Bool.ValueOf(cmp >= 0);
		case CmpOp.LTE:
			return Bool.ValueOf(cmp <= 0);
		default:
            context.problemListener.reportIllegalOperand();
			// throw new SyntaxError("Illegal operand: " + this.operator.toString());
	}
};


CompareExpression.prototype.interpretAssert = function(context, test) {
    var lval = this.left.interpret(context);
    var rval = this.right.interpret(context);
    var result = this.compare(context, lval, rval);
    if(result==Bool.TRUE)
        return true;
    var writer = new CodeWriter(test.dialect, context);
    this.toDialect(writer);
    var expected = writer.toString();
    var actual = lval.toString() + this.operator.toString() + rval.toString();
    test.printFailedAssertion(context, expected, actual);
    return false;
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
            value = value.getMemberValue(context, "dbId", False)
        var matchOp = this.getMatchOp();
        query.verify(info, matchOp, value == null ? null : value.getStorableData());
        if (this.operator == CmpOp.GTE || this.operator==CmpOp.LTE)
            query.not();
    }
};

CompareExpression.prototype.getMatchOp = function() {
    if (this.operator == CmpOp.GT || this.operator == CmpOp.LTE)
        return MatchOp.GREATER;
    else if (this.operator == CmpOp.GTE || this.operator == CmpOp.LT)
        return MatchOp.LESSER;
    else
        throw new InvalidValueError(this.operator.toString());
};


exports.CompareExpression = CompareExpression;