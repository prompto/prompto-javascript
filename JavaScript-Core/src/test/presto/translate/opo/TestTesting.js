require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testNegative = function(test) {
	compareResourceOPO(test, "testing/negative.o");
};

exports.testNegativeError = function(test) {
	compareResourceOPO(test, "testing/negativeError.o");
};

exports.testPositive = function(test) {
	compareResourceOPO(test, "testing/positive.o");
};

exports.testPositiveError = function(test) {
	compareResourceOPO(test, "testing/positiveError.o");
};

