require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testChildElement = function(test) {
	compareResourceOMO(test, "jsx/childElement.poc");
};

exports.testCodeAttribute = function(test) {
	compareResourceOMO(test, "jsx/codeAttribute.poc");
};

exports.testCodeElement = function(test) {
	compareResourceOMO(test, "jsx/codeElement.poc");
};

exports.testDotName = function(test) {
	compareResourceOMO(test, "jsx/dotName.poc");
};

exports.testEmpty = function(test) {
	compareResourceOMO(test, "jsx/empty.poc");
};

exports.testEmptyAttribute = function(test) {
	compareResourceOMO(test, "jsx/emptyAttribute.poc");
};

exports.testHyphenName = function(test) {
	compareResourceOMO(test, "jsx/hyphenName.poc");
};

exports.testLiteralAttribute = function(test) {
	compareResourceOMO(test, "jsx/literalAttribute.poc");
};

exports.testSelfClosingDiv = function(test) {
	compareResourceOMO(test, "jsx/selfClosingDiv.poc");
};

exports.testSelfClosingEmptyAttribute = function(test) {
	compareResourceOMO(test, "jsx/selfClosingEmptyAttribute.poc");
};

exports.testTextElement = function(test) {
	compareResourceOMO(test, "jsx/textElement.poc");
};

