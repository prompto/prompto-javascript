// generated: 2015-07-05T23:01:02.041
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCategoryEnum = function(test) {
	compareResourceEOE(test, "enums/categoryEnum.pec");
};

exports.testIntegerEnum = function(test) {
	compareResourceEOE(test, "enums/integerEnum.pec");
};

exports.testTextEnum = function(test) {
	compareResourceEOE(test, "enums/textEnum.pec");
};

