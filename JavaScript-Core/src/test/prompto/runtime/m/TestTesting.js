require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseMParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAnd = function(test) {
	checkOutput(test, "testing/and.pmc");
};

exports.testContains = function(test) {
	checkOutput(test, "testing/contains.pmc");
};

exports.testGreater = function(test) {
	checkOutput(test, "testing/greater.pmc");
};

exports.testMethod = function(test) {
	checkOutput(test, "testing/method.pmc");
};

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.pmc");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.pmc");
};

exports.testNot = function(test) {
	checkOutput(test, "testing/not.pmc");
};

exports.testOr = function(test) {
	checkOutput(test, "testing/or.pmc");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.pmc");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.pmc");
};

