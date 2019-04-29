require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testMinusDecimal = function(test) {
	compareResourceOMO(test, "minus/minusDecimal.poc");
};

exports.testMinusInteger = function(test) {
	compareResourceOMO(test, "minus/minusInteger.poc");
};

exports.testMinusPeriod = function(test) {
	compareResourceOMO(test, "minus/minusPeriod.poc");
};

