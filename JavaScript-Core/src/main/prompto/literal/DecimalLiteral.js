var Literal = require("./Literal").Literal;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var DecimalType = require("../type/DecimalType").DecimalType;

function DecimalLiteral(text) {
	Literal.call(this, text, DecimalValue.Parse(text));
	return this;
}

DecimalLiteral.prototype = Object.create(Literal.prototype);
DecimalLiteral.prototype.constructor = DecimalLiteral;

DecimalLiteral.prototype.check = function(context) {
	return DecimalType.instance;
};

DecimalLiteral.prototype.transpile = function(transpiler) {
    transpiler.append(this.text);
};


exports.DecimalLiteral = DecimalLiteral;