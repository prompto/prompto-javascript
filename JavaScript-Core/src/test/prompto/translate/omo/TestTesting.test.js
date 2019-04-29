require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testAnd = function(test) {
	compareResourceOMO(test, "testing/and.poc");
};

exports.testContains = function(test) {
	compareResourceOMO(test, "testing/contains.poc");
};

exports.testGreater = function(test) {
	compareResourceOMO(test, "testing/greater.poc");
};

exports.testMethod = function(test) {
	compareResourceOMO(test, "testing/method.poc");
};

exports.testNegative = function(test) {
	compareResourceOMO(test, "testing/negative.poc");
};

exports.testNegativeError = function(test) {
	compareResourceOMO(test, "testing/negativeError.poc");
};

exports.testNot = function(test) {
	compareResourceOMO(test, "testing/not.poc");
};

exports.testOr = function(test) {
	compareResourceOMO(test, "testing/or.poc");
};

exports.testPositive = function(test) {
	compareResourceOMO(test, "testing/positive.poc");
};

exports.testPositiveError = function(test) {
	compareResourceOMO(test, "testing/positiveError.poc");
};

