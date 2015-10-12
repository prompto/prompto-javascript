require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCategoryEnum = function(test) {
	compareResourceEOE(test, "enums/categoryEnum.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testIntegerEnum = function(test) {
	compareResourceEOE(test, "enums/integerEnum.pec");
};

exports.testTextEnum = function(test) {
	compareResourceEOE(test, "enums/textEnum.pec");
};

