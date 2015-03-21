require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testMinusDecimal = function(test) {
	compareResourceOPO(test, "minus/minusDecimal.o");
};

exports.testMinusInteger = function(test) {
	compareResourceOPO(test, "minus/minusInteger.o");
};

exports.testMinusPeriod = function(test) {
	compareResourceOPO(test, "minus/minusPeriod.o");
};

