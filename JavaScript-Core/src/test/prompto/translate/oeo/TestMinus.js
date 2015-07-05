// generated: 2015-07-05T23:01:02.127
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMinusDecimal = function(test) {
	compareResourceOEO(test, "minus/minusDecimal.poc");
};

exports.testMinusInteger = function(test) {
	compareResourceOEO(test, "minus/minusInteger.poc");
};

exports.testMinusPeriod = function(test) {
	compareResourceOEO(test, "minus/minusPeriod.poc");
};

