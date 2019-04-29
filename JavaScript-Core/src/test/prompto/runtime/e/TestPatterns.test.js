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

exports.testInterpretedIntegerEnumeration = function(test) {
	checkInterpretedOutput(test, "patterns/integerEnumeration.pec");
};

exports.testTranspiledIntegerEnumeration = function(test) {
	checkTranspiledOutput(test, "patterns/integerEnumeration.pec");
};

exports.testInterpretedIntegerPattern = function(test) {
	checkInterpretedOutput(test, "patterns/integerPattern.pec");
};

exports.testTranspiledIntegerPattern = function(test) {
	checkTranspiledOutput(test, "patterns/integerPattern.pec");
};

exports.testInterpretedNegativeIntegerRange = function(test) {
	checkInterpretedOutput(test, "patterns/negativeIntegerRange.pec");
};

exports.testTranspiledNegativeIntegerRange = function(test) {
	checkTranspiledOutput(test, "patterns/negativeIntegerRange.pec");
};

exports.testInterpretedPositiveIntegerRange = function(test) {
	checkInterpretedOutput(test, "patterns/positiveIntegerRange.pec");
};

exports.testTranspiledPositiveIntegerRange = function(test) {
	checkTranspiledOutput(test, "patterns/positiveIntegerRange.pec");
};

exports.testInterpretedTextEnumeration = function(test) {
	checkInterpretedOutput(test, "patterns/textEnumeration.pec");
};

exports.testTranspiledTextEnumeration = function(test) {
	checkTranspiledOutput(test, "patterns/textEnumeration.pec");
};

exports.testInterpretedTextPattern = function(test) {
	checkInterpretedOutput(test, "patterns/textPattern.pec");
};

exports.testTranspiledTextPattern = function(test) {
	checkTranspiledOutput(test, "patterns/textPattern.pec");
};

