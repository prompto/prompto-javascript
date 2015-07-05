// generated: 2015-07-05T23:01:02.045
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testCategoryEnum = function(test) {
	compareResourceOSO(test, "enums/categoryEnum.poc");
};

exports.testIntegerEnum = function(test) {
	compareResourceOSO(test, "enums/integerEnum.poc");
};

exports.testTextEnum = function(test) {
	compareResourceOSO(test, "enums/textEnum.poc");
};

