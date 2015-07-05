// generated: 2015-07-05T23:01:02.124
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMinusDecimal = function(test) {
	compareResourceEOE(test, "minus/minusDecimal.pec");
};

exports.testMinusInteger = function(test) {
	compareResourceEOE(test, "minus/minusInteger.pec");
};

exports.testMinusPeriod = function(test) {
	compareResourceEOE(test, "minus/minusPeriod.pec");
};

