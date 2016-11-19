require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAnd = function(test) {
	compareResourceEME(test, "testing/and.pec");
};

exports.testContains = function(test) {
	compareResourceEME(test, "testing/contains.pec");
};

exports.testGreater = function(test) {
	compareResourceEME(test, "testing/greater.pec");
};

exports.testMethod = function(test) {
	compareResourceEME(test, "testing/method.pec");
};

exports.testNegative = function(test) {
	compareResourceEME(test, "testing/negative.pec");
};

exports.testNegativeError = function(test) {
	compareResourceEME(test, "testing/negativeError.pec");
};

exports.testNot = function(test) {
	compareResourceEME(test, "testing/not.pec");
};

exports.testOr = function(test) {
	compareResourceEME(test, "testing/or.pec");
};

exports.testPositive = function(test) {
	compareResourceEME(test, "testing/positive.pec");
};

exports.testPositiveError = function(test) {
	compareResourceEME(test, "testing/positiveError.pec");
};

