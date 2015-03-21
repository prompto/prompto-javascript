require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMinusDecimal = function(test) {
	compareResourceOEO(test, "minus/minusDecimal.o");
};

exports.testMinusInteger = function(test) {
	compareResourceOEO(test, "minus/minusInteger.o");
};

exports.testMinusPeriod = function(test) {
	compareResourceOEO(test, "minus/minusPeriod.o");
};

