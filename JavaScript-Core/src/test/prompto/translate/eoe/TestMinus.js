require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMinusDecimal = function(test) {
	compareResourceEOE(test, "minus/minusDecimal.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testMinusInteger = function(test) {
	compareResourceEOE(test, "minus/minusInteger.pec");
};

exports.testMinusPeriod = function(test) {
	compareResourceEOE(test, "minus/minusPeriod.pec");
};

