require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testCategoryEnum = function(test) {
	compareResourceESE(test, "enums/categoryEnum.pec");
};

exports.testIntegerEnum = function(test) {
	compareResourceESE(test, "enums/integerEnum.pec");
};

exports.testTextEnum = function(test) {
	compareResourceESE(test, "enums/textEnum.pec");
};

