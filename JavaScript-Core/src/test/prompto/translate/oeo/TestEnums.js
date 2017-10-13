require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCategoryEnum = function(test) {
	compareResourceOEO(test, "enums/categoryEnum.poc");
};

exports.testIntegerEnum = function(test) {
	compareResourceOEO(test, "enums/integerEnum.poc");
};

exports.testTextEnum = function(test) {
	compareResourceOEO(test, "enums/textEnum.poc");
};

exports.testTextEnumArg = function(test) {
	compareResourceOEO(test, "enums/textEnumArg.poc");
};

exports.testTextEnumVar = function(test) {
	compareResourceOEO(test, "enums/textEnumVar.poc");
};

