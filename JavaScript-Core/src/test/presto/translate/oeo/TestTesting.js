require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAnd = function(test) {
	compareResourceOEO(test, "testing/and.poc");
};

exports.testContains = function(test) {
	compareResourceOEO(test, "testing/contains.poc");
};

exports.testGreater = function(test) {
	compareResourceOEO(test, "testing/greater.poc");
};

exports.testMethod = function(test) {
	compareResourceOEO(test, "testing/method.poc");
};

exports.testNegative = function(test) {
	compareResourceOEO(test, "testing/negative.poc");
};

exports.testNegativeError = function(test) {
	compareResourceOEO(test, "testing/negativeError.poc");
};

exports.testNot = function(test) {
	compareResourceOEO(test, "testing/not.poc");
};

exports.testOr = function(test) {
	compareResourceOEO(test, "testing/or.poc");
};

exports.testPositive = function(test) {
	compareResourceOEO(test, "testing/positive.poc");
};

exports.testPositiveError = function(test) {
	compareResourceOEO(test, "testing/positiveError.poc");
};

