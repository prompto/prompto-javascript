require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseSParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAnd = function(test) {
	checkOutput(test, "testing/and.psc");
};

exports.testContains = function(test) {
	checkOutput(test, "testing/contains.psc");
};

exports.testGreater = function(test) {
	checkOutput(test, "testing/greater.psc");
};

exports.testMethod = function(test) {
	checkOutput(test, "testing/method.psc");
};

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.psc");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.psc");
};

exports.testNot = function(test) {
	checkOutput(test, "testing/not.psc");
};

exports.testOr = function(test) {
	checkOutput(test, "testing/or.psc");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.psc");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.psc");
};

