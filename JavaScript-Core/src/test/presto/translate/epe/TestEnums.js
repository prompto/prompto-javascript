require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testCategoryEnum = function(test) {
	compareResourceEPE(test, "enums/categoryEnum.e");
};

exports.testIntegerEnum = function(test) {
	compareResourceEPE(test, "enums/integerEnum.e");
};

exports.testTextEnum = function(test) {
	compareResourceEPE(test, "enums/textEnum.e");
};

