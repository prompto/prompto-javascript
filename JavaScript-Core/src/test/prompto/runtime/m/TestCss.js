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

exports.testInterpretedCodeValue = function(test) {
	checkInterpretedOutput(test, "css/codeValue.pmc");
};

exports.testTranspiledCodeValue = function(test) {
	checkTranspiledOutput(test, "css/codeValue.pmc");
};

exports.testInterpretedHyphenName = function(test) {
	checkInterpretedOutput(test, "css/hyphenName.pmc");
};

exports.testTranspiledHyphenName = function(test) {
	checkTranspiledOutput(test, "css/hyphenName.pmc");
};

exports.testInterpretedMultiValue = function(test) {
	checkInterpretedOutput(test, "css/multiValue.pmc");
};

exports.testTranspiledMultiValue = function(test) {
	checkTranspiledOutput(test, "css/multiValue.pmc");
};

exports.testInterpretedNumberValue = function(test) {
	checkInterpretedOutput(test, "css/numberValue.pmc");
};

exports.testTranspiledNumberValue = function(test) {
	checkTranspiledOutput(test, "css/numberValue.pmc");
};

exports.testInterpretedPixelValue = function(test) {
	checkInterpretedOutput(test, "css/pixelValue.pmc");
};

exports.testTranspiledPixelValue = function(test) {
	checkTranspiledOutput(test, "css/pixelValue.pmc");
};

exports.testInterpretedTextValue = function(test) {
	checkInterpretedOutput(test, "css/textValue.pmc");
};

exports.testTranspiledTextValue = function(test) {
	checkTranspiledOutput(test, "css/textValue.pmc");
};

