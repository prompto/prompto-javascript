require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testChildElement = function(test) {
	compareResourceOEO(test, "jsx/childElement.poc");
};

exports.testCodeAttribute = function(test) {
	compareResourceOEO(test, "jsx/codeAttribute.poc");
};

exports.testCodeElement = function(test) {
	compareResourceOEO(test, "jsx/codeElement.poc");
};

exports.testDotName = function(test) {
	compareResourceOEO(test, "jsx/dotName.poc");
};

exports.testEmpty = function(test) {
	compareResourceOEO(test, "jsx/empty.poc");
};

exports.testEmptyAttribute = function(test) {
	compareResourceOEO(test, "jsx/emptyAttribute.poc");
};

exports.testHyphenName = function(test) {
	compareResourceOEO(test, "jsx/hyphenName.poc");
};

exports.testLiteralAttribute = function(test) {
	compareResourceOEO(test, "jsx/literalAttribute.poc");
};

exports.testSelfClosingDiv = function(test) {
	compareResourceOEO(test, "jsx/selfClosingDiv.poc");
};

exports.testSelfClosingEmptyAttribute = function(test) {
	compareResourceOEO(test, "jsx/selfClosingEmptyAttribute.poc");
};

exports.testTextElement = function(test) {
	compareResourceOEO(test, "jsx/textElement.poc");
};

