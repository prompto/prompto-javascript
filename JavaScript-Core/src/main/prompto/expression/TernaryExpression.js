var BooleanType = require("../type/BooleanType").BooleanType;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var VoidType = require("../type/VoidType").VoidType;

function TernaryExpression(condition, ifTrue, ifFalse) {
    this.condition = condition;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
    return this;
}

TernaryExpression.prototype.toDialect = function(writer) {
    if(writer.dialect==Dialect.O) {
        this.condition.toDialect(writer);
        writer.append(" ? ");
        this.ifTrue.toDialect(writer);
        writer.append(" : ");
        this.ifFalse.toDialect(writer);
    } else {
        this.ifTrue.toDialect(writer);
        writer.append(" if ");
        this.condition.toDialect(writer);
        writer.append(" else ");
        this.ifFalse.toDialect(writer);
    }
};

TernaryExpression.prototype.check = function(context) {
    var type = this.condition.check(context);
    if(!(type instanceof BooleanType))
        context.problemListener.reportExpectingBoolean(this.condition, type);
    var trueType = this.ifTrue.check(context);
    var falseType = this.ifFalse.check(context);
    if(trueType.isAssignableFrom(context, falseType))
       return trueType;
    else if(falseType.isAssignableFrom(context, trueType))
        return falseType;
};

TernaryExpression.prototype.interpret = function(context) {
    var test = this.condition.interpret(context);
    if(test == BooleanValue.TRUE)
        return this.ifTrue.interpret(context);
    else
        return this.ifFalse.interpret(context);
};

TernaryExpression.prototype.declare = function(transpiler) {
    this.condition.declare(transpiler);
    this.ifTrue.declare(transpiler);
    this.ifFalse.declare(transpiler);
};

TernaryExpression.prototype.transpile = function(transpiler) {
    transpiler.append("(");
    this.condition.transpile(transpiler);
    transpiler.append(" ? ");
    this.ifTrue.transpile(transpiler);
    transpiler.append(" : ");
    this.ifFalse.transpile(transpiler);
    transpiler.append(")");
};

exports.TernaryExpression = TernaryExpression;
