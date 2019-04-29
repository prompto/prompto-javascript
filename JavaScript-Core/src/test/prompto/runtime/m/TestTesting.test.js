require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAnd = function(test) {
	checkInterpretedOutput(test, "testing/and.pmc");
};

exports.testTranspiledAnd = function(test) {
	checkTranspiledOutput(test, "testing/and.pmc");
};

exports.testInterpretedContains = function(test) {
	checkInterpretedOutput(test, "testing/contains.pmc");
};

exports.testTranspiledContains = function(test) {
	checkTranspiledOutput(test, "testing/contains.pmc");
};

exports.testInterpretedGreater = function(test) {
	checkInterpretedOutput(test, "testing/greater.pmc");
};

exports.testTranspiledGreater = function(test) {
	checkTranspiledOutput(test, "testing/greater.pmc");
};

exports.testInterpretedMethod = function(test) {
	checkInterpretedOutput(test, "testing/method.pmc");
};

exports.testTranspiledMethod = function(test) {
	checkTranspiledOutput(test, "testing/method.pmc");
};

exports.testInterpretedNegative = function(test) {
	checkInterpretedOutput(test, "testing/negative.pmc");
};

exports.testTranspiledNegative = function(test) {
	checkTranspiledOutput(test, "testing/negative.pmc");
};

exports.testInterpretedNegativeError = function(test) {
	checkInterpretedOutput(test, "testing/negativeError.pmc");
};

exports.testTranspiledNegativeError = function(test) {
	checkTranspiledOutput(test, "testing/negativeError.pmc");
};

exports.testInterpretedNot = function(test) {
	checkInterpretedOutput(test, "testing/not.pmc");
};

exports.testTranspiledNot = function(test) {
	checkTranspiledOutput(test, "testing/not.pmc");
};

exports.testInterpretedOr = function(test) {
	checkInterpretedOutput(test, "testing/or.pmc");
};

exports.testTranspiledOr = function(test) {
	checkTranspiledOutput(test, "testing/or.pmc");
};

exports.testInterpretedPositive = function(test) {
	checkInterpretedOutput(test, "testing/positive.pmc");
};

exports.testTranspiledPositive = function(test) {
	checkTranspiledOutput(test, "testing/positive.pmc");
};

exports.testInterpretedPositiveError = function(test) {
	checkInterpretedOutput(test, "testing/positiveError.pmc");
};

exports.testTranspiledPositiveError = function(test) {
	checkTranspiledOutput(test, "testing/positiveError.pmc");
};

