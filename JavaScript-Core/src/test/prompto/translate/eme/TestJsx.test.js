require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testChildElement = function(test) {
	compareResourceEME(test, "jsx/childElement.pec");
};

exports.testCodeAttribute = function(test) {
	compareResourceEME(test, "jsx/codeAttribute.pec");
};

exports.testCodeElement = function(test) {
	compareResourceEME(test, "jsx/codeElement.pec");
};

exports.testDotName = function(test) {
	compareResourceEME(test, "jsx/dotName.pec");
};

exports.testEmpty = function(test) {
	compareResourceEME(test, "jsx/empty.pec");
};

exports.testEmptyAttribute = function(test) {
	compareResourceEME(test, "jsx/emptyAttribute.pec");
};

exports.testHyphenName = function(test) {
	compareResourceEME(test, "jsx/hyphenName.pec");
};

exports.testLiteralAttribute = function(test) {
	compareResourceEME(test, "jsx/literalAttribute.pec");
};

exports.testSelfClosingDiv = function(test) {
	compareResourceEME(test, "jsx/selfClosingDiv.pec");
};

exports.testSelfClosingEmptyAttribute = function(test) {
	compareResourceEME(test, "jsx/selfClosingEmptyAttribute.pec");
};

exports.testTextElement = function(test) {
	compareResourceEME(test, "jsx/textElement.pec");
};

