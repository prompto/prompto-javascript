require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testNegative = function(test) {
	compareResourceEPE(test, "testing/negative.e");
};

exports.testNegativeError = function(test) {
	compareResourceEPE(test, "testing/negativeError.e");
};

exports.testPositive = function(test) {
	compareResourceEPE(test, "testing/positive.e");
};

exports.testPositiveError = function(test) {
	compareResourceEPE(test, "testing/positiveError.e");
};

