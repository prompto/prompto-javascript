var Integer = require("../value/Integer").Integer;
var Decimal = require("../value/Decimal").Decimal;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;

function Argument(id) {
	this.id = id;
    this.mutable = false;
    this.defaultExpression = null;
	return this;
}

Object.defineProperty(Argument.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

Argument.prototype.checkValue = function(context, expression) {
    var value = expression.interpret(context);
    if (value instanceof Integer && this.getType(context)==DecimalType.instance) {
        return new Decimal(value.DecimalValue());
    } else if (value instanceof Decimal && this.getType(context)==IntegerType.instance) {
        return new Integer(value.IntegerValue());
    } else {
        return value;
    }
};

Argument.prototype.toDialect = function(writer) {
    if(this.mutable)
        writer.append("mutable ");
    writer.toDialect(this);
    if(this.defaultExpression!=null) {
        writer.append(" = ");
        this.defaultExpression.toDialect(writer);
    }
};

exports.Argument = Argument;
