require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCategoryEnum = function(test) {
	compareResourceEOE(test, "enums/categoryEnum.e");
};

exports.testIntegerEnum = function(test) {
	compareResourceEOE(test, "enums/integerEnum.e");
};

exports.testTextEnum = function(test) {
	compareResourceEOE(test, "enums/textEnum.e");
};

