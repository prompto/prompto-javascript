require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAnd = function(test) {
	compareResourceEOE(test, "testing/and.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testContains = function(test) {
	compareResourceEOE(test, "testing/contains.pec");
};

exports.testGreater = function(test) {
	compareResourceEOE(test, "testing/greater.pec");
};

exports.testMethod = function(test) {
	compareResourceEOE(test, "testing/method.pec");
};

exports.testNegative = function(test) {
	compareResourceEOE(test, "testing/negative.pec");
};

exports.testNegativeError = function(test) {
	compareResourceEOE(test, "testing/negativeError.pec");
};

exports.testNot = function(test) {
	compareResourceEOE(test, "testing/not.pec");
};

exports.testOr = function(test) {
	compareResourceEOE(test, "testing/or.pec");
};

exports.testPositive = function(test) {
	compareResourceEOE(test, "testing/positive.pec");
};

exports.testPositiveError = function(test) {
	compareResourceEOE(test, "testing/positiveError.pec");
};

