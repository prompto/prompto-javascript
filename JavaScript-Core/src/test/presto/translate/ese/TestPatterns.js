require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testIntegerEnumeration = function(test) {
	compareResourceESE(test, "patterns/integerEnumeration.pec");
};

exports.testIntegerPattern = function(test) {
	compareResourceESE(test, "patterns/integerPattern.pec");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceESE(test, "patterns/negativeIntegerRange.pec");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceESE(test, "patterns/positiveIntegerRange.pec");
};

exports.testTextEnumeration = function(test) {
	compareResourceESE(test, "patterns/textEnumeration.pec");
};

exports.testTextPattern = function(test) {
	compareResourceESE(test, "patterns/textPattern.pec");
};

