var Literal = require("./Literal").Literal;
var TupleType = require("../type/TupleType").TupleType;
var TupleValue = require("../value/TupleValue").TupleValue;
var ExpressionList = require("../utils/ExpressionList").ExpressionList;

function TupleLiteral(mutable, expressions) {
    if(typeof(mutable)!=typeof(true))
        throw "mutable!";
    expressions = expressions || new ExpressionList();
	Literal.call(this, "(" + expressions.toString() + ")", new TupleValue());
    this.mutable = mutable;
    this.expressions = expressions;
	return this;
}

TupleLiteral.prototype = Object.create(Literal.prototype);
TupleLiteral.prototype.constructor = TupleLiteral;

TupleLiteral.prototype.check = function(context) {
	return TupleType.instance;
};

TupleLiteral.prototype.interpret = function(context) {
    if(this.expressions.length>0) {
        var tuple = new TupleValue();
        this.expressions.forEach(function(expression) {
            var item = expression.interpret(context);
            tuple.add(item);
        });
        tuple.mutable = this.mutable;
        return tuple;
    } else
        return this.value;
};

TupleLiteral.prototype.toDialect = function(writer) {
    if(this.mutable)
        writer.append("mutable ");
    if(this.expressions!=null) {
        writer.append('(');
        this.expressions.toDialect(writer);
        if(this.expressions.length==1)
            writer.append(',');
        writer.append(')');
    } else
        writer.append("()");
};


exports.TupleLiteral = TupleLiteral;