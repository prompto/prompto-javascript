require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAnd = function(test) {
	checkOutput(test, "testing/and.poc");
};

exports.testContains = function(test) {
	checkOutput(test, "testing/contains.poc");
};

exports.testGreater = function(test) {
	checkOutput(test, "testing/greater.poc");
};

exports.testMethod = function(test) {
	checkOutput(test, "testing/method.poc");
};

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.poc");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.poc");
};

exports.testNot = function(test) {
	checkOutput(test, "testing/not.poc");
};

exports.testOr = function(test) {
	checkOutput(test, "testing/or.poc");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.poc");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.poc");
};

