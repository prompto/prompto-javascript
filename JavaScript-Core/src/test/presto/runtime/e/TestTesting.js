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
	checkOutput(test, "testing/and.e");
};

exports.testContains = function(test) {
	checkOutput(test, "testing/contains.e");
};

exports.testGreater = function(test) {
	checkOutput(test, "testing/greater.e");
};

exports.testMethod = function(test) {
	checkOutput(test, "testing/method.e");
};

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.e");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.e");
};

exports.testNot = function(test) {
	checkOutput(test, "testing/not.e");
};

exports.testOr = function(test) {
	checkOutput(test, "testing/or.e");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.e");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.e");
};

