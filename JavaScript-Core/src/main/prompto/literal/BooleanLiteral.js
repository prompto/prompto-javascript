var Literal = require("./Literal").Literal;
var BooleanType = require("../type/BooleanType").BooleanType;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

function BooleanLiteral(text) {
	Literal.call(this, text, BooleanValue.Parse(text));
	return this;
}

BooleanLiteral.prototype = Object.create(Literal.prototype);
BooleanLiteral.prototype.constructor = BooleanLiteral;

BooleanLiteral.prototype.check = function(context) {
	return BooleanType.instance;
};

exports.BooleanLiteral = BooleanLiteral;