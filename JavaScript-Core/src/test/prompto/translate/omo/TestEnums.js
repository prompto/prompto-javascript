require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testCategoryEnum = function(test) {
	compareResourceOMO(test, "enums/categoryEnum.poc");
};

exports.testIntegerEnum = function(test) {
	compareResourceOMO(test, "enums/integerEnum.poc");
};

exports.testTextEnum = function(test) {
	compareResourceOMO(test, "enums/textEnum.poc");
};
