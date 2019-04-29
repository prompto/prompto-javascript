require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCodeValue = function(test) {
	compareResourceOEO(test, "css/codeValue.poc");
};

exports.testHyphenName = function(test) {
	compareResourceOEO(test, "css/hyphenName.poc");
};

exports.testMultiValue = function(test) {
	compareResourceOEO(test, "css/multiValue.poc");
};

exports.testNumberValue = function(test) {
	compareResourceOEO(test, "css/numberValue.poc");
};

exports.testPixelValue = function(test) {
	compareResourceOEO(test, "css/pixelValue.poc");
};

exports.testTextValue = function(test) {
	compareResourceOEO(test, "css/textValue.poc");
};

