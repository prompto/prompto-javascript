require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAnd = function(test) {
	compareResourceOEO(test, "testing/and.o");
};

exports.testContains = function(test) {
	compareResourceOEO(test, "testing/contains.o");
};

exports.testGreater = function(test) {
	compareResourceOEO(test, "testing/greater.o");
};

exports.testMethod = function(test) {
	compareResourceOEO(test, "testing/method.o");
};

exports.testNegative = function(test) {
	compareResourceOEO(test, "testing/negative.o");
};

exports.testNegativeError = function(test) {
	compareResourceOEO(test, "testing/negativeError.o");
};

exports.testNot = function(test) {
	compareResourceOEO(test, "testing/not.o");
};

exports.testOr = function(test) {
	compareResourceOEO(test, "testing/or.o");
};

exports.testPositive = function(test) {
	compareResourceOEO(test, "testing/positive.o");
};

exports.testPositiveError = function(test) {
	compareResourceOEO(test, "testing/positiveError.o");
};

