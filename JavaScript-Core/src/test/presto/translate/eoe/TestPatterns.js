require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testIntegerEnumeration = function(test) {
	compareResourceEOE(test, "patterns/integerEnumeration.e");
};

exports.testIntegerPattern = function(test) {
	compareResourceEOE(test, "patterns/integerPattern.e");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceEOE(test, "patterns/negativeIntegerRange.e");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceEOE(test, "patterns/positiveIntegerRange.e");
};

exports.testTextEnumeration = function(test) {
	compareResourceEOE(test, "patterns/textEnumeration.e");
};

exports.testTextPattern = function(test) {
	compareResourceEOE(test, "patterns/textPattern.e");
};

