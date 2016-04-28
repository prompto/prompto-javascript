var Literal = require("./Literal").Literal;
var ListValue = require("../value/ListValue").ListValue;
var ListType = require("../type/ListType").ListType;
var MissingType = require("../type/MissingType").MissingType;
var ExpressionList = require("../utils/ExpressionList").ExpressionList;
var DecimalType = require("../type/DecimalType").DecimalType;
var IntegerType = require("../type/IntegerType").IntegerType;
var CharacterType = require("../type/CharacterType").CharacterType;
var TextType = require("../type/TextType").TextType;
var Decimal = require("../value/Decimal").Decimal;
var Text = require("../value/Text").Text;

function ListLiteral(expressions) {
    expressions = expressions || new ExpressionList();
	Literal.call(this, "[" + expressions.toString() + "]", new ListValue(MissingType.instance));
	this.itemType = null;
    this.expressions = expressions;
	return this;
}

ListLiteral.prototype = Object.create(Literal.prototype);
ListLiteral.prototype.constructor = ListLiteral;


ListLiteral.prototype.check = function(context) {
	if(this.itemType==null) {
		this.itemType = this.inferElementType(context);
        this.type = new ListType(this.itemType);
	}
	return this.type;
};

ListLiteral.prototype.inferElementType = function(context) {
    if (this.expressions.length == 0)
        return MissingType.instance;
    var lastType = null;
    for (var i = 0; i < this.expressions.length; i++) {
        var elemType = this.expressions[i].check(context);
        if (lastType == null) {
            lastType = elemType;
        } else if (!lastType.equals(elemType)) {
            if (elemType.isAssignableTo(context, lastType)) {
                ; // lastType is less specific
            } else if (lastType.isAssignableTo(context, elemType)) {
                lastType = elemType; // elemType is less specific
            } else {
                throw new SyntaxError("Incompatible types: " + elemType.toString() + " and " + lastType.toString());
            }
        }
    }
    return lastType;
};

ListLiteral.prototype.interpret = function(context) {
	if(this.expressions.length) {
        var self = this;
        this.check(context); // force computation of itemType
		var list = new ListValue(this.itemType);
		this.expressions.forEach(function(expression) {
			var item = expression.interpret(context);
            item = self.interpretPromotion(item);
			list.add(item);
		});
		return list;
	} else
	    return this.value;
};

ListLiteral.prototype.interpretPromotion = function(item) {
    if (item == null)
        return item;
    if (DecimalType.instance == this.itemType && item.type == IntegerType.instance)
        return new Decimal(item.DecimalValue());
    else if (TextType.instance == this.itemType && item.type == CharacterType.instance)
        return new Text(item.value);
    else
        return item;
};

ListLiteral.prototype.toDialect = function(writer) {
    if(this.expressions!=null) {
        writer.append('[');
        this.expressions.toDialect(writer);
        writer.append(']');
    } else
        writer.append("[]");
};

exports.ListLiteral = ListLiteral;
