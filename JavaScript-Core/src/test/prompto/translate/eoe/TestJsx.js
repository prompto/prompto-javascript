require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testChildElement = function(test) {
	compareResourceEOE(test, "jsx/childElement.pec");
};

exports.testCodeAttribute = function(test) {
	compareResourceEOE(test, "jsx/codeAttribute.pec");
};

exports.testCodeElement = function(test) {
	compareResourceEOE(test, "jsx/codeElement.pec");
};

exports.testDotName = function(test) {
	compareResourceEOE(test, "jsx/dotName.pec");
};

exports.testEmpty = function(test) {
	compareResourceEOE(test, "jsx/empty.pec");
};

exports.testEmptyAttribute = function(test) {
	compareResourceEOE(test, "jsx/emptyAttribute.pec");
};

exports.testHyphenName = function(test) {
	compareResourceEOE(test, "jsx/hyphenName.pec");
};

exports.testLiteralAttribute = function(test) {
	compareResourceEOE(test, "jsx/literalAttribute.pec");
};

exports.testSelfClosingDiv = function(test) {
	compareResourceEOE(test, "jsx/selfClosingDiv.pec");
};

exports.testSelfClosingEmptyAttribute = function(test) {
	compareResourceEOE(test, "jsx/selfClosingEmptyAttribute.pec");
};

exports.testTextElement = function(test) {
	compareResourceEOE(test, "jsx/textElement.pec");
};

