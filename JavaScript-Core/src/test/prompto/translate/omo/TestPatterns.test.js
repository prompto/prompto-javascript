require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testIntegerEnumeration = function(test) {
	compareResourceOMO(test, "patterns/integerEnumeration.poc");
};

exports.testIntegerPattern = function(test) {
	compareResourceOMO(test, "patterns/integerPattern.poc");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceOMO(test, "patterns/negativeIntegerRange.poc");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceOMO(test, "patterns/positiveIntegerRange.poc");
};

exports.testTextEnumeration = function(test) {
	compareResourceOMO(test, "patterns/textEnumeration.poc");
};

exports.testTextPattern = function(test) {
	compareResourceOMO(test, "patterns/textPattern.poc");
};

