var Expression = require("./Expression").Expression;
var TypeMap = require("../type/TypeMap").TypeMap;
var BooleanType = require("../type/BooleanType").BooleanType;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

function TernaryExpression(condition, ifTrue, ifFalse) {
    Expression.call(this);
    this.condition = condition;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
    return this;
}

TernaryExpression.prototype = Object.create(Expression.prototype);
TernaryExpression.prototype.constructor = TernaryExpression;

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
        context.problemListener.reportIllegalAssignment(this.condition, BooleanType.instance, type);
    var trueType = this.ifTrue.check(context);
    var falseType = this.ifFalse.check(context);
    var types = new TypeMap();
    types[trueType.name] = trueType;
    types[falseType.name] = falseType;
    return types.inferType(context, this);
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
