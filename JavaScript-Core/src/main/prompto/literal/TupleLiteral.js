var Literal = require("./Literal").Literal;
var TupleType = require("../type/TupleType").TupleType;
var TupleValue = require("../value/TupleValue").TupleValue;
var ExpressionList = require("../utils/ExpressionList").ExpressionList;

function TupleLiteral(expressions) {
    expressions = expressions || new ExpressionList();
	Literal.call(this, "(" + expressions.toString() + ")", new TupleValue());
    this.expressions = expressions;
	return this;
}

TupleLiteral.prototype = Object.create(Literal.prototype);
TupleLiteral.prototype.constructor = TupleLiteral;

TupleLiteral.prototype.check = function(context) {
	return TupleType.instance;
};

TupleLiteral.prototype.toDialect = function(writer) {
    this.value.toDialect(writer);
};

TupleLiteral.prototype.interpret = function(context) {
    if(this.expressions.length>0) {
        var tuple = new TupleValue();
        this.expressions.forEach(function(expression) {
            var item = expression.interpret(context);
            tuple.add(item);
        });
        return tuple;
    } else
        return this.value;
};

TupleLiteral.prototype.toDialect = function(writer) {
    if(this.expressions!=null) {
        writer.append('(');
        this.expressions.toDialect(writer);
        writer.append(')');
    } else
        writer.append("()");
};


exports.TupleLiteral = TupleLiteral;