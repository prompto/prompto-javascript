var IntegerValue = require("../value/IntegerValue").IntegerValue;
var Literal = require("./Literal").Literal;
var IntegerType = require("../type/IntegerType").IntegerType;

function parse(value) {
	if(typeof(value)=='string') {
		return parseInt(value);
	} else {
		return value;
	}
}

function IntegerLiteral(text, value) {
	Literal.call(this, text, new IntegerValue(parse(value)));
	return this;
}

IntegerLiteral.prototype = Object.create(Literal.prototype);
IntegerLiteral.prototype.constructor = IntegerLiteral;

IntegerLiteral.prototype.check = function(context) {
	return IntegerType.instance;
};

IntegerLiteral.prototype.transpile = function(transpiler) {
    transpiler.append(this.text);
};

function MinIntegerLiteral() {
    IntegerLiteral.call(this, "MIN_INTEGER", -0x20000000000000);
    return this;
}

MinIntegerLiteral.prototype = Object.create(IntegerLiteral.prototype);
MinIntegerLiteral.prototype.constructor = MinIntegerLiteral;

function MaxIntegerLiteral() {
    IntegerLiteral.call(this, "MAX_INTEGER", 0x20000000000000);
    return this;
}

MaxIntegerLiteral.prototype = Object.create(IntegerLiteral.prototype);
MaxIntegerLiteral.prototype.constructor = MaxIntegerLiteral;

exports.IntegerLiteral = IntegerLiteral;
exports.MinIntegerLiteral = MinIntegerLiteral;
exports.MaxIntegerLiteral = MaxIntegerLiteral;