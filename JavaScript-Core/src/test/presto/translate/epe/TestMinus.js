require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testMinusDecimal = function(test) {
	compareResourceEPE(test, "minus/minusDecimal.e");
};

exports.testMinusInteger = function(test) {
	compareResourceEPE(test, "minus/minusInteger.e");
};

exports.testMinusPeriod = function(test) {
	compareResourceEPE(test, "minus/minusPeriod.e");
};

