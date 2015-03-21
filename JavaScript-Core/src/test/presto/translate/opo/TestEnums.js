require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testCategoryEnum = function(test) {
	compareResourceOPO(test, "enums/categoryEnum.o");
};

exports.testIntegerEnum = function(test) {
	compareResourceOPO(test, "enums/integerEnum.o");
};

exports.testTextEnum = function(test) {
	compareResourceOPO(test, "enums/textEnum.o");
};

