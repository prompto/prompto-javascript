require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testIntegerEnumeration = function(test) {
	compareResourceEOE(test, "patterns/integerEnumeration.pec");
};

exports.testIntegerPattern = function(test) {
	compareResourceEOE(test, "patterns/integerPattern.pec");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceEOE(test, "patterns/negativeIntegerRange.pec");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceEOE(test, "patterns/positiveIntegerRange.pec");
};

exports.testTextEnumeration = function(test) {
	compareResourceEOE(test, "patterns/textEnumeration.pec");
};

exports.testTextPattern = function(test) {
	compareResourceEOE(test, "patterns/textPattern.pec");
};

