// generated: 2015-07-05T23:01:02.218
require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAnd = function(test) {
	checkOutput(test, "testing/and.pec");
};

exports.testContains = function(test) {
	checkOutput(test, "testing/contains.pec");
};

exports.testGreater = function(test) {
	checkOutput(test, "testing/greater.pec");
};

exports.testMethod = function(test) {
	checkOutput(test, "testing/method.pec");
};

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.pec");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.pec");
};

exports.testNot = function(test) {
	checkOutput(test, "testing/not.pec");
};

exports.testOr = function(test) {
	checkOutput(test, "testing/or.pec");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.pec");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.pec");
};

