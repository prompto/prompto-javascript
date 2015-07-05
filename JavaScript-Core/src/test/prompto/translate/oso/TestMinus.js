// generated: 2015-07-05T23:01:02.127
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testMinusDecimal = function(test) {
	compareResourceOSO(test, "minus/minusDecimal.poc");
};

exports.testMinusInteger = function(test) {
	compareResourceOSO(test, "minus/minusInteger.poc");
};

exports.testMinusPeriod = function(test) {
	compareResourceOSO(test, "minus/minusPeriod.poc");
};

