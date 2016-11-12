var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
var LinkedVariable = require("../runtime/LinkedVariable").LinkedVariable;
var LinkedValue = require("../runtime/LinkedValue").LinkedValue;
var BooleanType = require("../type/BooleanType").BooleanType;
var TypeValue = require("../value/TypeValue").TypeValue;
var NullValue = require("../value/NullValue").NullValue;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Instance = require("../value/Value").Instance;
var Value = require("../value/Value").Value;
var MatchOp = require("../store/MatchOp").MatchOp;
var Bool = require("../value/Bool").Bool;
var EqOp = require("../grammar/EqOp").EqOp;

function EqualsExpression(left, operator, right) {
	this.left = left;
	this.operator = operator;
	this.right = right;
	return this;
}

EqualsExpression.prototype.toString = function() {
	return this.left.toString() + " " + this.operator.toString() + " " + this.right.toString();
};

var VOWELS = "AEIO"; // sufficient here

EqualsExpression.prototype.toDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" ");
    this.operator.toDialect(writer);
    // make this a AN
    if(this.operator==EqOp.IS_A || this.operator==EqOp.IS_NOT_A) {
        var name = this.right.toString();
        if(VOWELS.indexOf(name.charAt(0))>=0)
            writer.append("n");
    }
    writer.append(" ");
    this.right.toDialect(writer);
};

EqualsExpression.prototype.check = function(context) {
	this.left.check(context);
	this.right.check(context);
	return BooleanType.instance; // can compare all objects
};

EqualsExpression.prototype.interpret = function(context) {
    var lval = this.left.interpret(context) || NullValue.instance;
    var rval = this.right.interpret(context) || NullValue.instance;
    return this.interpretValues(context, lval, rval);
};

EqualsExpression.prototype.interpretValues = function(context, lval, rval) {
    var equal = false;
    switch(this.operator) {
        case EqOp.IS:
            equal = lval==rval;
            break;
        case EqOp.IS_NOT:
            equal = lval!=rval;
            break;
        case EqOp.IS_A:
            equal = this.isA(context,lval,rval);
            break;
        case EqOp.IS_NOT_A:
            equal = !this.isA(context,lval,rval);
            break;
        case EqOp.EQUALS:
            equal = this.areEqual(context,lval,rval);
            break;
        case EqOp.NOT_EQUALS:
            equal = !this.areEqual(context,lval,rval);
            break;
        case EqOp.ROUGHLY:
            equal = this.roughly(context,lval,rval);
            break;
    }
    return Bool.ValueOf(equal);
};

EqualsExpression.prototype.roughly = function(context, lval, rval) {
    if(lval!=null && rval!=null && lval.Roughly) {
        return lval.Roughly(context, rval);
    } else {
        return this.areEqual(context, lval, rval);
    }
};

EqualsExpression.prototype.areEqual = function(context, lval, rval) {
	if(lval==rval) {
		return true;
	} else if(lval==NullValue.instance || rval==NullValue.instance) {
        return false;
    } else {
		return lval.equals(rval);
	}
};

EqualsExpression.prototype.isA = function(context, lval, rval) {
    if(lval instanceof Value && rval instanceof TypeValue) {
        var actual = lval.type;
        var toCheck = rval.value;
        return toCheck.isAssignableFrom(context, actual);
    } else
        return false;
};


EqualsExpression.prototype.downCast = function(context, setValue) {
    if(this.operator==EqOp.IS_A) {
        var id = this.readLeftId();
        if(id!=null) {
            var value = context.getRegisteredValue(id.name);
            var type = this.right.value;
            var local = context.newChildContext();
            value = new LinkedVariable(type, value);
            local.registerValue(value, false);
            if(setValue)
                local.setValue(id, new LinkedValue(context));
            context = local;
        }
    }
    return context;
};

EqualsExpression.prototype.readLeftId = function() {
    if(this.left instanceof InstanceExpression)
        return this.left.id;
    else if(this.left instanceof UnresolvedIdentifier)
        return this.left.id;
    else
        return null;
};

EqualsExpression.prototype.interpretAssert = function(context, test) {
    var lval = this.left.interpret(context) || NullValue.instance;
    var rval = this.right.interpret(context) || NullValue.instance;
    var result = this.interpretValues(context, lval, rval);
    if(result==Bool.TRUE)
        return true;
    var writer = new CodeWriter(test.dialect, context);
    this.toDialect(writer);
    var expected = writer.toString();
    var actual = lval.toString() + " " + this.operator.toString(test.dialect) + " " + rval.toString();
    test.printFailure(context, expected, actual);
    return false;
};

EqualsExpression.prototype.interpretQuery = function(context, query) {
    var value = null;
    var name = this.readFieldName(this.left);
    if (name != null)
        value = this.right.interpret(context);
    else {
        name = this.readFieldName(this.right);
        if (name != null)
            value = this.left.interpret(context);
        else
            throw new SyntaxError("Unable to interpret predicate");
    }
    if (value instanceof Instance)
        value = value.getMember(context, "dbId", false);
    var decl = context.findAttribute(name);
    var info = decl == null ? null : decl.getAttributeInfo();
    var data = value == null ? null : value.getStorableData();
    var match = this.getMatchOp();
    query.verify(info, match, data);
    if (this.operator == EqOp.NOT_EQUALS)
        query.not();
};


EqualsExpression.prototype.getMatchOp = function() {
    switch (this.operator) {
        case EqOp.EQUALS:
            return MatchOp.EQUALS;
        case EqOp.ROUGHLY:
            return MatchOp.ROUGHLY;
        case EqOp.NOT_EQUALS:
            return MatchOp.EQUALS
        default:
            throw new Exception("Not supported:" + this.operator.toString());
    }
};


EqualsExpression.prototype.readFieldName = function(exp) {
    if (exp instanceof UnresolvedIdentifier || exp instanceof InstanceExpression || exp instanceof MemberSelector)
        return exp.toString();
    else
        return null;
};

exports.EqualsExpression = EqualsExpression;


