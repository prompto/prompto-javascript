require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testNegative = function(test) {
	compareResourceOEO(test, "testing/negative.o");
};

exports.testNegativeError = function(test) {
	compareResourceOEO(test, "testing/negativeError.o");
};

exports.testPositive = function(test) {
	compareResourceOEO(test, "testing/positive.o");
};

exports.testPositiveError = function(test) {
	compareResourceOEO(test, "testing/positiveError.o");
};

