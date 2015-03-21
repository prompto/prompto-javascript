require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testIntegerEnumeration = function(test) {
	compareResourceOEO(test, "patterns/integerEnumeration.o");
};

exports.testIntegerPattern = function(test) {
	compareResourceOEO(test, "patterns/integerPattern.o");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceOEO(test, "patterns/negativeIntegerRange.o");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceOEO(test, "patterns/positiveIntegerRange.o");
};

exports.testTextEnumeration = function(test) {
	compareResourceOEO(test, "patterns/textEnumeration.o");
};

exports.testTextPattern = function(test) {
	compareResourceOEO(test, "patterns/textPattern.o");
};

