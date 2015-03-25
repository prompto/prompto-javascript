require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testNegative = function(test) {
	compareResourceEOE(test, "testing/negative.e");
};

exports.testNegativeError = function(test) {
	compareResourceEOE(test, "testing/negativeError.e");
};

exports.testPositive = function(test) {
	compareResourceEOE(test, "testing/positive.e");
};

exports.testPositiveError = function(test) {
	compareResourceEOE(test, "testing/positiveError.e");
};

