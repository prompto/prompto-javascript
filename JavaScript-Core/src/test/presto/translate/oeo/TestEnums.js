require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCategoryEnum = function(test) {
	compareResourceOEO(test, "enums/categoryEnum.o");
};

exports.testIntegerEnum = function(test) {
	compareResourceOEO(test, "enums/integerEnum.o");
};

exports.testTextEnum = function(test) {
	compareResourceOEO(test, "enums/textEnum.o");
};

