require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testIntegerEnumeration = function(test) {
	compareResourceEME(test, "patterns/integerEnumeration.pec");
};

exports.testIntegerPattern = function(test) {
	compareResourceEME(test, "patterns/integerPattern.pec");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceEME(test, "patterns/negativeIntegerRange.pec");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceEME(test, "patterns/positiveIntegerRange.pec");
};

exports.testTextEnumeration = function(test) {
	compareResourceEME(test, "patterns/textEnumeration.pec");
};

exports.testTextPattern = function(test) {
	compareResourceEME(test, "patterns/textPattern.pec");
};

