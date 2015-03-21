require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMinusDecimal = function(test) {
	compareResourceEOE(test, "minus/minusDecimal.e");
};

exports.testMinusInteger = function(test) {
	compareResourceEOE(test, "minus/minusInteger.e");
};

exports.testMinusPeriod = function(test) {
	compareResourceEOE(test, "minus/minusPeriod.e");
};

