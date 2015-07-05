// generated: 2015-07-05T23:01:02.042
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

