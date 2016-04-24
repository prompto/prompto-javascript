
function CastExpression(expression, type) {
    this.expression = expression;
    this.type = type;
    return this;
}

CastExpression.prototype.check = function(context) {
    var actual = this.expression.check(context);
    if(!this.type.isAssignableTo(context, actual))
        context.problemListener.reportInvalidCast(this, this.type, actual);
    return this.type;
};

CastExpression.prototype.interpret = function(context) {
    var value = this.expression.interpret(context);
    if(value && this.type.isMoreSpecificThan(context, value.type))
        value.type = this.type;
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

CastExpression.prototype.toSDialect = function(writer) {
    this.toEDialect(writer);
};

CastExpression.prototype.toODialect = function(writer) {
    writer.append("(");
    this.type.toDialect(writer);
    writer.append(")");
    this.expression.toDialect(writer);
};

exports.CastExpression = CastExpression;
