require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testAnd = function(test) {
	compareResourceOPO(test, "testing/and.o");
};

exports.testContains = function(test) {
	compareResourceOPO(test, "testing/contains.o");
};

exports.testGreater = function(test) {
	compareResourceOPO(test, "testing/greater.o");
};

exports.testMethod = function(test) {
	compareResourceOPO(test, "testing/method.o");
};

exports.testNegative = function(test) {
	compareResourceOPO(test, "testing/negative.o");
};

exports.testNegativeError = function(test) {
	compareResourceOPO(test, "testing/negativeError.o");
};

exports.testNot = function(test) {
	compareResourceOPO(test, "testing/not.o");
};

exports.testOr = function(test) {
	compareResourceOPO(test, "testing/or.o");
};

exports.testPositive = function(test) {
	compareResourceOPO(test, "testing/positive.o");
};

exports.testPositiveError = function(test) {
	compareResourceOPO(test, "testing/positiveError.o");
};

