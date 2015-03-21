require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testIntegerEnumeration = function(test) {
	compareResourceEPE(test, "patterns/integerEnumeration.e");
};

exports.testIntegerPattern = function(test) {
	compareResourceEPE(test, "patterns/integerPattern.e");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceEPE(test, "patterns/negativeIntegerRange.e");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceEPE(test, "patterns/positiveIntegerRange.e");
};

exports.testTextEnumeration = function(test) {
	compareResourceEPE(test, "patterns/textEnumeration.e");
};

exports.testTextPattern = function(test) {
	compareResourceEPE(test, "patterns/textPattern.e");
};

