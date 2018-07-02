require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testCodeValue = function(test) {
	compareResourceOMO(test, "css/codeValue.poc");
};

exports.testHyphenName = function(test) {
	compareResourceOMO(test, "css/hyphenName.poc");
};

exports.testMultiValue = function(test) {
	compareResourceOMO(test, "css/multiValue.poc");
};

exports.testNumberValue = function(test) {
	compareResourceOMO(test, "css/numberValue.poc");
};

exports.testPixelValue = function(test) {
	compareResourceOMO(test, "css/pixelValue.poc");
};

exports.testTextValue = function(test) {
	compareResourceOMO(test, "css/textValue.poc");
};

