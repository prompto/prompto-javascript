// generated: 2015-07-05T23:01:02.220
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAnd = function(test) {
	compareResourceOSO(test, "testing/and.poc");
};

exports.testContains = function(test) {
	compareResourceOSO(test, "testing/contains.poc");
};

exports.testGreater = function(test) {
	compareResourceOSO(test, "testing/greater.poc");
};

exports.testMethod = function(test) {
	compareResourceOSO(test, "testing/method.poc");
};

exports.testNegative = function(test) {
	compareResourceOSO(test, "testing/negative.poc");
};

exports.testNegativeError = function(test) {
	compareResourceOSO(test, "testing/negativeError.poc");
};

exports.testNot = function(test) {
	compareResourceOSO(test, "testing/not.poc");
};

exports.testOr = function(test) {
	compareResourceOSO(test, "testing/or.poc");
};

exports.testPositive = function(test) {
	compareResourceOSO(test, "testing/positive.poc");
};

exports.testPositiveError = function(test) {
	compareResourceOSO(test, "testing/positiveError.poc");
};

