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

exports.testInterpretedIntegerEnumeration = function(test) {
	checkInterpretedOutput(test, "patterns/integerEnumeration.poc");
};

exports.testTranspiledIntegerEnumeration = function(test) {
	checkTranspiledOutput(test, "patterns/integerEnumeration.poc");
};

exports.testInterpretedIntegerPattern = function(test) {
	checkInterpretedOutput(test, "patterns/integerPattern.poc");
};

exports.testTranspiledIntegerPattern = function(test) {
	checkTranspiledOutput(test, "patterns/integerPattern.poc");
};

exports.testInterpretedNegativeIntegerRange = function(test) {
	checkInterpretedOutput(test, "patterns/negativeIntegerRange.poc");
};

exports.testTranspiledNegativeIntegerRange = function(test) {
	checkTranspiledOutput(test, "patterns/negativeIntegerRange.poc");
};

exports.testInterpretedPositiveIntegerRange = function(test) {
	checkInterpretedOutput(test, "patterns/positiveIntegerRange.poc");
};

exports.testTranspiledPositiveIntegerRange = function(test) {
	checkTranspiledOutput(test, "patterns/positiveIntegerRange.poc");
};

exports.testInterpretedTextEnumeration = function(test) {
	checkInterpretedOutput(test, "patterns/textEnumeration.poc");
};

exports.testTranspiledTextEnumeration = function(test) {
	checkTranspiledOutput(test, "patterns/textEnumeration.poc");
};

exports.testInterpretedTextPattern = function(test) {
	checkInterpretedOutput(test, "patterns/textPattern.poc");
};

exports.testTranspiledTextPattern = function(test) {
	checkTranspiledOutput(test, "patterns/textPattern.poc");
};

