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

exports.testInterpretedCodeValue = function(test) {
	checkInterpretedOutput(test, "css/codeValue.poc");
};

exports.testTranspiledCodeValue = function(test) {
	checkTranspiledOutput(test, "css/codeValue.poc");
};

exports.testInterpretedHyphenName = function(test) {
	checkInterpretedOutput(test, "css/hyphenName.poc");
};

exports.testTranspiledHyphenName = function(test) {
	checkTranspiledOutput(test, "css/hyphenName.poc");
};

exports.testInterpretedMultiValue = function(test) {
	checkInterpretedOutput(test, "css/multiValue.poc");
};

exports.testTranspiledMultiValue = function(test) {
	checkTranspiledOutput(test, "css/multiValue.poc");
};

exports.testInterpretedNumberValue = function(test) {
	checkInterpretedOutput(test, "css/numberValue.poc");
};

exports.testTranspiledNumberValue = function(test) {
	checkTranspiledOutput(test, "css/numberValue.poc");
};

exports.testInterpretedPixelValue = function(test) {
	checkInterpretedOutput(test, "css/pixelValue.poc");
};

exports.testTranspiledPixelValue = function(test) {
	checkTranspiledOutput(test, "css/pixelValue.poc");
};

exports.testInterpretedTextValue = function(test) {
	checkInterpretedOutput(test, "css/textValue.poc");
};

exports.testTranspiledTextValue = function(test) {
	checkTranspiledOutput(test, "css/textValue.poc");
};

