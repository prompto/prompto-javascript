require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testIntegerEnumeration = function(test) {
	compareResourceOSO(test, "patterns/integerEnumeration.poc");
};

exports.testIntegerPattern = function(test) {
	compareResourceOSO(test, "patterns/integerPattern.poc");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceOSO(test, "patterns/negativeIntegerRange.poc");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceOSO(test, "patterns/positiveIntegerRange.poc");
};

exports.testTextEnumeration = function(test) {
	compareResourceOSO(test, "patterns/textEnumeration.poc");
};

exports.testTextPattern = function(test) {
	compareResourceOSO(test, "patterns/textPattern.poc");
};

