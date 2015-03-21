require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testIntegerEnumeration = function(test) {
	compareResourceOPO(test, "patterns/integerEnumeration.o");
};

exports.testIntegerPattern = function(test) {
	compareResourceOPO(test, "patterns/integerPattern.o");
};

exports.testNegativeIntegerRange = function(test) {
	compareResourceOPO(test, "patterns/negativeIntegerRange.o");
};

exports.testPositiveIntegerRange = function(test) {
	compareResourceOPO(test, "patterns/positiveIntegerRange.o");
};

exports.testTextEnumeration = function(test) {
	compareResourceOPO(test, "patterns/textEnumeration.o");
};

exports.testTextPattern = function(test) {
	compareResourceOPO(test, "patterns/textPattern.o");
};

