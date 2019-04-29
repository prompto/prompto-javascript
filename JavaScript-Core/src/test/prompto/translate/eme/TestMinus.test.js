require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testMinusDecimal = function(test) {
	compareResourceEME(test, "minus/minusDecimal.pec");
};

exports.testMinusInteger = function(test) {
	compareResourceEME(test, "minus/minusInteger.pec");
};

exports.testMinusPeriod = function(test) {
	compareResourceEME(test, "minus/minusPeriod.pec");
};

