require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCodeValue = function(test) {
	compareResourceEOE(test, "css/codeValue.pec");
};

exports.testHyphenName = function(test) {
	compareResourceEOE(test, "css/hyphenName.pec");
};

exports.testMultiValue = function(test) {
	compareResourceEOE(test, "css/multiValue.pec");
};

exports.testNumberValue = function(test) {
	compareResourceEOE(test, "css/numberValue.pec");
};

exports.testPixelValue = function(test) {
	compareResourceEOE(test, "css/pixelValue.pec");
};

exports.testTextValue = function(test) {
	compareResourceEOE(test, "css/textValue.pec");
};

