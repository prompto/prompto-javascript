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

exports.testInterpretedChildElement = function(test) {
	checkInterpretedOutput(test, "jsx/childElement.poc");
};

exports.testTranspiledChildElement = function(test) {
	checkTranspiledOutput(test, "jsx/childElement.poc");
};

exports.testInterpretedCodeAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/codeAttribute.poc");
};

exports.testTranspiledCodeAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/codeAttribute.poc");
};

exports.testInterpretedCodeElement = function(test) {
	checkInterpretedOutput(test, "jsx/codeElement.poc");
};

exports.testTranspiledCodeElement = function(test) {
	checkTranspiledOutput(test, "jsx/codeElement.poc");
};

exports.testInterpretedDotName = function(test) {
	checkInterpretedOutput(test, "jsx/dotName.poc");
};

exports.testTranspiledDotName = function(test) {
	checkTranspiledOutput(test, "jsx/dotName.poc");
};

exports.testInterpretedEmptyAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/emptyAttribute.poc");
};

exports.testTranspiledEmptyAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/emptyAttribute.poc");
};

exports.testInterpretedHyphenName = function(test) {
	checkInterpretedOutput(test, "jsx/hyphenName.poc");
};

exports.testTranspiledHyphenName = function(test) {
	checkTranspiledOutput(test, "jsx/hyphenName.poc");
};

exports.testInterpretedLiteralAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/literalAttribute.poc");
};

exports.testTranspiledLiteralAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/literalAttribute.poc");
};

exports.testInterpretedSelfClosingDiv = function(test) {
	checkInterpretedOutput(test, "jsx/selfClosingDiv.poc");
};

exports.testTranspiledSelfClosingDiv = function(test) {
	checkTranspiledOutput(test, "jsx/selfClosingDiv.poc");
};

exports.testInterpretedSelfClosingEmptyAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/selfClosingEmptyAttribute.poc");
};

exports.testTranspiledSelfClosingEmptyAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/selfClosingEmptyAttribute.poc");
};

exports.testInterpretedTextElement = function(test) {
	checkInterpretedOutput(test, "jsx/textElement.poc");
};

exports.testTranspiledTextElement = function(test) {
	checkTranspiledOutput(test, "jsx/textElement.poc");
};

