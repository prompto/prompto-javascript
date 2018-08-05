var AnyType = require("../type/AnyType").AnyType;
var CategoryType = require("../type/CategoryType").CategoryType;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;

function anify(type) {
    if(type instanceof CategoryType && type.name === "Any")
        return AnyType.instance;
    else
        return type;
}

function CastExpression(expression, type) {
    this.expression = expression;
    this.type = anify(type);
    return this;
}

CastExpression.prototype.check = function(context) {
    var actual = anify(this.expression.check(context));
    // check Any
    if(actual === AnyType.instance)
        return this.type;
    // check upcast
    if(this.type.isAssignableFrom(context, actual))
        return this.type;
    // check downcast
    if(actual.isAssignableFrom(context, this.type))
        return this.type;
    context.problemListener.reportInvalidCast(this, this.type, actual);
};

CastExpression.prototype.interpret = function(context) {
    var value = this.expression.interpret(context);
    if(value) {
        if (value instanceof IntegerValue && this.type==DecimalType.instance) {
            value = new DecimalValue(value.DecimalValue());
        } else if (value instanceof DecimalValue && this.type==IntegerType.instance) {
            value = new IntegerValue(value.IntegerValue());
        } else if (this.type.isMoreSpecificThan(context, value.type)) {
            value.type = this.type;
        }
    }
    return value;
};

CastExpression.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
    this.type.declare(transpiler);
};


CastExpression.prototype.transpile = function(transpiler) {
    var expType = this.expression.check(transpiler.context);
    if(expType===DecimalType.instance && this.type===IntegerType.instance) {
        transpiler.append("Math.floor(");
        this.expression.transpile(transpiler);
        transpiler.append(")");
    } else
        this.expression.transpile(transpiler);
};


CastExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

CastExpression.prototype.toEDialect = function(writer) {
    this.expression.toDialect(writer);
    writer.append(" as ");
    this.type.toDialect(writer);
};

CastExpression.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
};

CastExpression.prototype.toODialect = function(writer) {
    writer.append("(");
    this.type.toDialect(writer);
    writer.append(")");
    this.expression.toDialect(writer);
};

exports.CastExpression = CastExpression;
