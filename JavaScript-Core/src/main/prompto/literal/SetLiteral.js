var Literal = require("./Literal").Literal;
var SetValue = require("../value/SetValue").SetValue;
var SetType = require("../type/SetType").SetType;
var MissingType = require("../type/MissingType").MissingType;
var DecimalType = require("../type/DecimalType").DecimalType;
var IntegerType = require("../type/IntegerType").IntegerType;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextType = require("../type/TextType").TextType;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var TextValue = require("../value/TextValue").TextValue;
var ExpressionList = require("../utils/ExpressionList").ExpressionList;
var inferExpressionsType = require("../utils/TypeUtils").inferExpressionsType;

function SetLiteral(expressions) {
    expressions = expressions || new ExpressionList();
	Literal.call(this, "<" + expressions.toString() + ">", new SetValue(MissingType.instance));
	this.itemType = null;
    this.expressions = expressions;
	return this;
}

SetLiteral.prototype = Object.create(Literal.prototype);
SetLiteral.prototype.constructor = SetLiteral;


SetLiteral.prototype.check = function(context) {
	if(this.itemType==null) {
		this.itemType = inferExpressionsType(context, this.expressions);
        this.type = new SetType(this.itemType);
	}
	return this.type;
};


SetLiteral.prototype.interpret = function(context) {
    var self = this;
    this.check(context); // force computation of itemType
    var value = new SetValue(this.itemType);
    this.expressions.forEach(function(expression) {
        var item = expression.interpret(context);
        item = self.interpretPromotion(item);
        value.add(item);
    });
    return value;
};

SetLiteral.prototype.interpretPromotion = function(item) {
    if (item == null)
        return item;
    if (DecimalType.instance == this.itemType && item.type == IntegerType.instance)
        return new DecimalValue(item.DecimalValue());
    else if (TextType.instance == this.itemType && item.type == CharacterType.instance)
        return new TextValue(item.value);
    else
        return item;
};

SetLiteral.prototype.toDialect = function(writer) {
    if(this.expressions!=null) {
        writer.append('<');
        this.expressions.toDialect(writer);
        writer.append('>');
    } else
        writer.append("< >");
};

exports.SetLiteral = SetLiteral;
