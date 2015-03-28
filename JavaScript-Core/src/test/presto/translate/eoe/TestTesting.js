require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAnd = function(test) {
	compareResourceEOE(test, "testing/and.e");
};

exports.testContains = function(test) {
	compareResourceEOE(test, "testing/contains.e");
};

exports.testGreater = function(test) {
	compareResourceEOE(test, "testing/greater.e");
};

exports.testMethod = function(test) {
	compareResourceEOE(test, "testing/method.e");
};

exports.testNegative = function(test) {
	compareResourceEOE(test, "testing/negative.e");
};

exports.testNegativeError = function(test) {
	compareResourceEOE(test, "testing/negativeError.e");
};

exports.testNot = function(test) {
	compareResourceEOE(test, "testing/not.e");
};

exports.testOr = function(test) {
	compareResourceEOE(test, "testing/or.e");
};

exports.testPositive = function(test) {
	compareResourceEOE(test, "testing/positive.e");
};

exports.testPositiveError = function(test) {
	compareResourceEOE(test, "testing/positiveError.e");
};

