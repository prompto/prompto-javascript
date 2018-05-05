require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAnd = function(test) {
	checkInterpretedOutput(test, "testing/and.poc");
};

exports.testTranspiledAnd = function(test) {
	checkTranspiledOutput(test, "testing/and.poc");
};

exports.testInterpretedContains = function(test) {
	checkInterpretedOutput(test, "testing/contains.poc");
};

exports.testTranspiledContains = function(test) {
	checkTranspiledOutput(test, "testing/contains.poc");
};

exports.testInterpretedGreater = function(test) {
	checkInterpretedOutput(test, "testing/greater.poc");
};

exports.testTranspiledGreater = function(test) {
	checkTranspiledOutput(test, "testing/greater.poc");
};

exports.testInterpretedMethod = function(test) {
	checkInterpretedOutput(test, "testing/method.poc");
};

exports.testTranspiledMethod = function(test) {
	checkTranspiledOutput(test, "testing/method.poc");
};

exports.testInterpretedNegative = function(test) {
	checkInterpretedOutput(test, "testing/negative.poc");
};

exports.testTranspiledNegative = function(test) {
	checkTranspiledOutput(test, "testing/negative.poc");
};

exports.testInterpretedNegativeError = function(test) {
	checkInterpretedOutput(test, "testing/negativeError.poc");
};

exports.testTranspiledNegativeError = function(test) {
	checkTranspiledOutput(test, "testing/negativeError.poc");
};

exports.testInterpretedNot = function(test) {
	checkInterpretedOutput(test, "testing/not.poc");
};

exports.testTranspiledNot = function(test) {
	checkTranspiledOutput(test, "testing/not.poc");
};

exports.testInterpretedOr = function(test) {
	checkInterpretedOutput(test, "testing/or.poc");
};

exports.testTranspiledOr = function(test) {
	checkTranspiledOutput(test, "testing/or.poc");
};

exports.testInterpretedPositive = function(test) {
	checkInterpretedOutput(test, "testing/positive.poc");
};

exports.testTranspiledPositive = function(test) {
	checkTranspiledOutput(test, "testing/positive.poc");
};

exports.testInterpretedPositiveError = function(test) {
	checkInterpretedOutput(test, "testing/positiveError.poc");
};

exports.testTranspiledPositiveError = function(test) {
	checkTranspiledOutput(test, "testing/positiveError.poc");
};

