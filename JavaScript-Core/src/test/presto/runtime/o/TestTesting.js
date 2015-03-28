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
	checkOutput(test, "testing/and.o");
};

exports.testContains = function(test) {
	checkOutput(test, "testing/contains.o");
};

exports.testGreater = function(test) {
	checkOutput(test, "testing/greater.o");
};

exports.testMethod = function(test) {
	checkOutput(test, "testing/method.o");
};

exports.testNegative = function(test) {
	checkOutput(test, "testing/negative.o");
};

exports.testNegativeError = function(test) {
	checkOutput(test, "testing/negativeError.o");
};

exports.testNot = function(test) {
	checkOutput(test, "testing/not.o");
};

exports.testOr = function(test) {
	checkOutput(test, "testing/or.o");
};

exports.testPositive = function(test) {
	checkOutput(test, "testing/positive.o");
};

exports.testPositiveError = function(test) {
	checkOutput(test, "testing/positiveError.o");
};

