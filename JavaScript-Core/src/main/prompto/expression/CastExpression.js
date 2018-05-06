var Integer = require("../value/Integer").Integer;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;

function CastExpression(expression, type) {
    this.expression = expression;
    this.type = type;
    return this;
}

CastExpression.prototype.check = function(context) {
    var actual = this.expression.check(context);
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
        if (value instanceof Integer && this.type==DecimalType.instance) {
            value = new DecimalValue(value.DecimalValue());
        } else if (value instanceof DecimalValue && this.type==IntegerType.instance) {
            value = new Integer(value.IntegerValue());
        } else if (this.type.isMoreSpecificThan(context, value.type)) {
            value.type = this.type;
        }
    }
    return value;
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
