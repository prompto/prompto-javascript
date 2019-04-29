require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testIntegerEnumeration = function(test) {
	compareResourceOEO(test, "patterns/integerEnumeration.poc");
};

exports.testIntegerPattern = function(test) {
	compareResourceOEO(test, "patterns/integerPattern.poc");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceOEO(test, "patterns/negativeIntegerRange.poc");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceOEO(test, "patterns/positiveIntegerRange.poc");
};

exports.testTextEnumeration = function(test) {
	compareResourceOEO(test, "patterns/textEnumeration.poc");
};

exports.testTextPattern = function(test) {
	compareResourceOEO(test, "patterns/textPattern.poc");
};

