require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testAnd = function(test) {
	compareResourceEPE(test, "testing/and.e");
};

exports.testContains = function(test) {
	compareResourceEPE(test, "testing/contains.e");
};

exports.testGreater = function(test) {
	compareResourceEPE(test, "testing/greater.e");
};

exports.testMethod = function(test) {
	compareResourceEPE(test, "testing/method.e");
};

exports.testNegative = function(test) {
	compareResourceEPE(test, "testing/negative.e");
};

exports.testNegativeError = function(test) {
	compareResourceEPE(test, "testing/negativeError.e");
};

exports.testNot = function(test) {
	compareResourceEPE(test, "testing/not.e");
};

exports.testOr = function(test) {
	compareResourceEPE(test, "testing/or.e");
};

exports.testPositive = function(test) {
	compareResourceEPE(test, "testing/positive.e");
};

exports.testPositiveError = function(test) {
	compareResourceEPE(test, "testing/positiveError.e");
};

