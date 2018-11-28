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

exports.testInterpretedChildElement = function(test) {
	checkInterpretedOutput(test, "jsx/childElement.pec");
};

exports.testTranspiledChildElement = function(test) {
	checkTranspiledOutput(test, "jsx/childElement.pec");
};

exports.testInterpretedCodeAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/codeAttribute.pec");
};

exports.testTranspiledCodeAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/codeAttribute.pec");
};

exports.testInterpretedCodeElement = function(test) {
	checkInterpretedOutput(test, "jsx/codeElement.pec");
};

exports.testTranspiledCodeElement = function(test) {
	checkTranspiledOutput(test, "jsx/codeElement.pec");
};

exports.testInterpretedDotName = function(test) {
	checkInterpretedOutput(test, "jsx/dotName.pec");
};

exports.testTranspiledDotName = function(test) {
	checkTranspiledOutput(test, "jsx/dotName.pec");
};

exports.testInterpretedEmptyAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/emptyAttribute.pec");
};

exports.testTranspiledEmptyAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/emptyAttribute.pec");
};

exports.testInterpretedHyphenName = function(test) {
	checkInterpretedOutput(test, "jsx/hyphenName.pec");
};

exports.testTranspiledHyphenName = function(test) {
	checkTranspiledOutput(test, "jsx/hyphenName.pec");
};

exports.testInterpretedLiteralAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/literalAttribute.pec");
};

exports.testTranspiledLiteralAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/literalAttribute.pec");
};

exports.testInterpretedSelfClosingDiv = function(test) {
	checkInterpretedOutput(test, "jsx/selfClosingDiv.pec");
};

exports.testTranspiledSelfClosingDiv = function(test) {
	checkTranspiledOutput(test, "jsx/selfClosingDiv.pec");
};

exports.testInterpretedSelfClosingEmptyAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/selfClosingEmptyAttribute.pec");
};

exports.testTranspiledSelfClosingEmptyAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/selfClosingEmptyAttribute.pec");
};

exports.testInterpretedTextElement = function(test) {
	checkInterpretedOutput(test, "jsx/textElement.pec");
};

exports.testTranspiledTextElement = function(test) {
	checkTranspiledOutput(test, "jsx/textElement.pec");
};

