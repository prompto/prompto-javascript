// generated: 2015-07-05T23:01:02.217
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAnd = function(test) {
	compareResourceESE(test, "testing/and.pec");
};

exports.testContains = function(test) {
	compareResourceESE(test, "testing/contains.pec");
};

exports.testGreater = function(test) {
	compareResourceESE(test, "testing/greater.pec");
};

exports.testMethod = function(test) {
	compareResourceESE(test, "testing/method.pec");
};

exports.testNegative = function(test) {
	compareResourceESE(test, "testing/negative.pec");
};

exports.testNegativeError = function(test) {
	compareResourceESE(test, "testing/negativeError.pec");
};

exports.testNot = function(test) {
	compareResourceESE(test, "testing/not.pec");
};

exports.testOr = function(test) {
	compareResourceESE(test, "testing/or.pec");
};

exports.testPositive = function(test) {
	compareResourceESE(test, "testing/positive.pec");
};

exports.testPositiveError = function(test) {
	compareResourceESE(test, "testing/positiveError.pec");
};

