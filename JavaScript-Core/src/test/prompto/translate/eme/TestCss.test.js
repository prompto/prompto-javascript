require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testCodeValue = function(test) {
	compareResourceEME(test, "css/codeValue.pec");
};

exports.testHyphenName = function(test) {
	compareResourceEME(test, "css/hyphenName.pec");
};

exports.testMultiValue = function(test) {
	compareResourceEME(test, "css/multiValue.pec");
};

exports.testNumberValue = function(test) {
	compareResourceEME(test, "css/numberValue.pec");
};

exports.testPixelValue = function(test) {
	compareResourceEME(test, "css/pixelValue.pec");
};

exports.testTextValue = function(test) {
	compareResourceEME(test, "css/textValue.pec");
};

