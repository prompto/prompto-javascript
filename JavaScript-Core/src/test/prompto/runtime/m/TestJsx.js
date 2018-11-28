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

exports.testInterpretedChildElement = function(test) {
	checkInterpretedOutput(test, "jsx/childElement.pmc");
};

exports.testTranspiledChildElement = function(test) {
	checkTranspiledOutput(test, "jsx/childElement.pmc");
};

exports.testInterpretedCodeAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/codeAttribute.pmc");
};

exports.testTranspiledCodeAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/codeAttribute.pmc");
};

exports.testInterpretedCodeElement = function(test) {
	checkInterpretedOutput(test, "jsx/codeElement.pmc");
};

exports.testTranspiledCodeElement = function(test) {
	checkTranspiledOutput(test, "jsx/codeElement.pmc");
};

exports.testInterpretedDotName = function(test) {
	checkInterpretedOutput(test, "jsx/dotName.pmc");
};

exports.testTranspiledDotName = function(test) {
	checkTranspiledOutput(test, "jsx/dotName.pmc");
};

exports.testInterpretedEmptyAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/emptyAttribute.pmc");
};

exports.testTranspiledEmptyAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/emptyAttribute.pmc");
};

exports.testInterpretedHyphenName = function(test) {
	checkInterpretedOutput(test, "jsx/hyphenName.pmc");
};

exports.testTranspiledHyphenName = function(test) {
	checkTranspiledOutput(test, "jsx/hyphenName.pmc");
};

exports.testInterpretedLiteralAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/literalAttribute.pmc");
};

exports.testTranspiledLiteralAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/literalAttribute.pmc");
};

exports.testInterpretedSelfClosingDiv = function(test) {
	checkInterpretedOutput(test, "jsx/selfClosingDiv.pmc");
};

exports.testTranspiledSelfClosingDiv = function(test) {
	checkTranspiledOutput(test, "jsx/selfClosingDiv.pmc");
};

exports.testInterpretedSelfClosingEmptyAttribute = function(test) {
	checkInterpretedOutput(test, "jsx/selfClosingEmptyAttribute.pmc");
};

exports.testTranspiledSelfClosingEmptyAttribute = function(test) {
	checkTranspiledOutput(test, "jsx/selfClosingEmptyAttribute.pmc");
};

exports.testInterpretedTextElement = function(test) {
	checkInterpretedOutput(test, "jsx/textElement.pmc");
};

exports.testTranspiledTextElement = function(test) {
	checkTranspiledOutput(test, "jsx/textElement.pmc");
};

