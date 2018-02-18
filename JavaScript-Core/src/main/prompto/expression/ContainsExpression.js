var UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
var InstanceExpression = require("../expression/InstanceExpression").InstanceExpression;
var MemberSelector = require("../expression/MemberSelector").MemberSelector;
var CharacterType = require("../type/CharacterType").CharacterType;
var ContainerType = require("../type/ContainerType").ContainerType;
var TextType = require("../type/TextType").TextType;
var NullValue = require("../value/NullValue").NullValue;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var MatchOp = require("../store/MatchOp").MatchOp;
var ContOp = require("../grammar/ContOp").ContOp;
var Instance = require("../value/Value").Instance;
var Value = require("../value/Value").Value;
var Bool = require("../value/Bool").Bool;

function ContainsExpression(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
    return this;
}

ContainsExpression.prototype.toString = function() {
    return this.left.toString() + " " + this.operator.toString() + " " + this.right.toString();
};

ContainsExpression.prototype.toDialect = function(writer) {
    this.left.toDialect(writer);
    writer.append(" ");
    this.operator.toDialect(writer);
    writer.append(" ");
    this.right.toDialect(writer);
};

ContainsExpression.prototype.check = function(context) {
    var lt = this.left.check(context);
    var rt = this.right.check(context);
    switch(this.operator) {
    case ContOp.IN:
    case ContOp.NOT_IN:
        return rt.checkContains(context,lt);
    case ContOp.HAS:
    case ContOp.NOT_HAS:
        return lt.checkContains(context, rt);
    default:
        return lt.checkContainsAllOrAny(context, rt);
    }
};

ContainsExpression.prototype.interpret = function(context) {
    var lval = this.left.interpret(context);
    var rval = this.right.interpret(context);
    return this.interpretValues(context, lval, rval);
};

ContainsExpression.prototype.interpretValues = function(context, lval, rval) {
    var result = null;
    switch (this.operator) {
    case ContOp.IN:
    case ContOp.NOT_IN:
        if(rval==NullValue.instance)
            result = false;
        else if(rval.hasItem)
            result = rval.hasItem(context, lval);
        break;
    case ContOp.HAS:
    case ContOp.NOT_HAS:
        if(lval==NullValue.instance)
            result = false;
        else if(lval.hasItem)
            result = lval.hasItem(context, rval);
        break;
    case ContOp.HAS_ALL:
    case ContOp.NOT_HAS_ALL:
        if(lval==NullValue.instance || rval==NullValue.instance)
            result = false;
        else if (lval.hasItem && rval.hasItem)
            result = this.containsAll(context, lval, rval);
        break;
    case ContOp.HAS_ANY:
    case ContOp.NOT_HAS_ANY:
        if(lval==NullValue.instance || rval==NullValue.instance)
            result = false;
        else if (lval.hasItem && rval.hasItem)
            result = this.containsAny(context, lval, rval);
        break;
    }
    if (result != null)
    {
        if (this.operator.name.indexOf("NOT_")==0) {
            result = !result;
        }
        return Bool.ValueOf(result);
    }
    // error management
    if (this.operator.name.lastIndexOf("IN")==this.operator.name.length-"IN".length) {
        var tmp = lval;
        lval = rval;
        rval = tmp;
    }
    var lowerName = this.operator.name.toLowerCase().replace('_', ' ');
    throw new SyntaxError("Illegal comparison: " + lval.type.toString() + " " + lowerName + " " + rval.type.toString());
};

ContainsExpression.prototype.containsAll = function(context, container, items) {
    var iterItems = items.getIterator(context);
    while(iterItems.hasNext()) {
        var item = iterItems.next();
        if (item instanceof Value) {
            if (!container.hasItem(context, item)) {
                return false;
            }
        } else
            context.problemListener.reportIllegalContains();
            // throw new SyntaxError("Illegal contains: " + typeof(container) + " + " + typeof(item));
    }
    return true;
};

ContainsExpression.prototype.containsAny = function(context, container, items) {
    var iterItems = items.getIterator(context);
    while(iterItems.hasNext()) {
        var item = iterItems.next();
        if (item instanceof Value)
        {
            if (container.hasItem(context, item)) {
                return true;
            }
        } else
            context.problemListener.reportIllegalContains();
            // throw new SyntaxError("Illegal contains: " + typeof(container) + " + " + typeof(item));
    }
    return false;
};

ContainsExpression.prototype.interpretAssert = function(context, test) {
    var lval = this.left.interpret(context);
    var rval = this.right.interpret(context);
    var result = this.interpretValues(context, lval, rval);
    if(result==Bool.TRUE)
        return true;
    var writer = new CodeWriter(test.dialect, context);
    this.toDialect(writer);
    var expected = writer.toString();
    var actual = lval.toString() + " " + this.operator.toString() +  " " + rval.toString();
    test.printFailedAssertion(context, expected, actual);
    return false;
};

ContainsExpression.prototype.interpretQuery = function(context, query) {
    var value = null;
    var name = this.readFieldName(this.left);
    var reverse = name == null;
    if ( name != null )
        value = this.right.interpret(context);
    else {
        name = this.readFieldName(this.right);
        if (name != null)
            value = this.left.interpret(context);
        else
            throw new SyntaxError("Unable to interpret predicate");
    }
    var matchOp = this.getMatchOp(context, this.getAttributeType(context, name), value.type, this.operator, reverse);
    if (value instanceof Instance)
        value = value.getMemberValue(context, "dbId", false);
    var info = context.findAttribute(name).getAttributeInfo();
    var data = value == null ? null : value.getStorableData();
    query.verify(info, matchOp, data);
    if (this.operator.name.indexOf("NOT_")==0)
        query.not();
};

ContainsExpression.prototype.getAttributeType = function(context, name) {
    return context.getRegisteredDeclaration(name).getType();
};

ContainsExpression.prototype.getMatchOp = function(context, fieldType, valueType, operator, reverse) {
    if (reverse) {
        var reversed = operator.reverse();
        if (reversed == null)
            throw new SyntaxError("Cannot reverse " + this.operator.toString());
        else
            return this.getMatchOp(context, valueType, fieldType, reversed, false);
    }
    if (operator == ContOp.HAS || operator == ContOp.NOT_HAS)
        return MatchOp.HAS;
    else if (operator == ContOp.IN || operator == ContOp.NOT_IN)
        return MatchOp.IN;
    else
        throw new SyntaxError("Unsupported operator: " + operator.toString());
};



ContainsExpression.prototype.readFieldName = function(exp) {
    if (exp instanceof UnresolvedIdentifier || exp instanceof InstanceExpression || exp instanceof MemberSelector)
        return exp.toString();
    else
        return null;
};


exports.ContainsExpression = ContainsExpression;