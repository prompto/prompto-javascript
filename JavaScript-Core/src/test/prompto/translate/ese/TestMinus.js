// generated: 2015-07-05T23:01:02.125
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testMinusDecimal = function(test) {
	compareResourceESE(test, "minus/minusDecimal.pec");
};

exports.testMinusInteger = function(test) {
	compareResourceESE(test, "minus/minusInteger.pec");
};

exports.testMinusPeriod = function(test) {
	compareResourceESE(test, "minus/minusPeriod.pec");
};

