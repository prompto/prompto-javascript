require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAnd = function(test) {
	checkInterpretedOutput(test, "testing/and.pec");
};

exports.testTranspiledAnd = function(test) {
	checkTranspiledOutput(test, "testing/and.pec");
};

exports.testInterpretedContains = function(test) {
	checkInterpretedOutput(test, "testing/contains.pec");
};

exports.testTranspiledContains = function(test) {
	checkTranspiledOutput(test, "testing/contains.pec");
};

exports.testInterpretedGreater = function(test) {
	checkInterpretedOutput(test, "testing/greater.pec");
};

exports.testTranspiledGreater = function(test) {
	checkTranspiledOutput(test, "testing/greater.pec");
};

exports.testInterpretedMethod = function(test) {
	checkInterpretedOutput(test, "testing/method.pec");
};

exports.testTranspiledMethod = function(test) {
	checkTranspiledOutput(test, "testing/method.pec");
};

exports.testInterpretedNegative = function(test) {
	checkInterpretedOutput(test, "testing/negative.pec");
};

exports.testTranspiledNegative = function(test) {
	checkTranspiledOutput(test, "testing/negative.pec");
};

exports.testInterpretedNegativeError = function(test) {
	checkInterpretedOutput(test, "testing/negativeError.pec");
};

exports.testTranspiledNegativeError = function(test) {
	checkTranspiledOutput(test, "testing/negativeError.pec");
};

exports.testInterpretedNot = function(test) {
	checkInterpretedOutput(test, "testing/not.pec");
};

exports.testTranspiledNot = function(test) {
	checkTranspiledOutput(test, "testing/not.pec");
};

exports.testInterpretedOr = function(test) {
	checkInterpretedOutput(test, "testing/or.pec");
};

exports.testTranspiledOr = function(test) {
	checkTranspiledOutput(test, "testing/or.pec");
};

exports.testInterpretedPositive = function(test) {
	checkInterpretedOutput(test, "testing/positive.pec");
};

exports.testTranspiledPositive = function(test) {
	checkTranspiledOutput(test, "testing/positive.pec");
};

exports.testInterpretedPositiveError = function(test) {
	checkInterpretedOutput(test, "testing/positiveError.pec");
};

exports.testTranspiledPositiveError = function(test) {
	checkTranspiledOutput(test, "testing/positiveError.pec");
};

