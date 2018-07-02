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

exports.testInterpretedCodeValue = function(test) {
	checkInterpretedOutput(test, "css/codeValue.pec");
};

exports.testTranspiledCodeValue = function(test) {
	checkTranspiledOutput(test, "css/codeValue.pec");
};

exports.testInterpretedHyphenName = function(test) {
	checkInterpretedOutput(test, "css/hyphenName.pec");
};

exports.testTranspiledHyphenName = function(test) {
	checkTranspiledOutput(test, "css/hyphenName.pec");
};

exports.testInterpretedMultiValue = function(test) {
	checkInterpretedOutput(test, "css/multiValue.pec");
};

exports.testTranspiledMultiValue = function(test) {
	checkTranspiledOutput(test, "css/multiValue.pec");
};

exports.testInterpretedNumberValue = function(test) {
	checkInterpretedOutput(test, "css/numberValue.pec");
};

exports.testTranspiledNumberValue = function(test) {
	checkTranspiledOutput(test, "css/numberValue.pec");
};

exports.testInterpretedPixelValue = function(test) {
	checkInterpretedOutput(test, "css/pixelValue.pec");
};

exports.testTranspiledPixelValue = function(test) {
	checkTranspiledOutput(test, "css/pixelValue.pec");
};

exports.testInterpretedTextValue = function(test) {
	checkInterpretedOutput(test, "css/textValue.pec");
};

exports.testTranspiledTextValue = function(test) {
	checkTranspiledOutput(test, "css/textValue.pec");
};

