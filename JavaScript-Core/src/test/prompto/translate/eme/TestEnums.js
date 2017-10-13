require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testCategoryEnum = function(test) {
	compareResourceEME(test, "enums/categoryEnum.pec");
};

exports.testIntegerEnum = function(test) {
	compareResourceEME(test, "enums/integerEnum.pec");
};

exports.testTextEnum = function(test) {
	compareResourceEME(test, "enums/textEnum.pec");
};

exports.testTextEnumArg = function(test) {
	compareResourceEME(test, "enums/textEnumArg.pec");
};

exports.testTextEnumVar = function(test) {
	compareResourceEME(test, "enums/textEnumVar.pec");
};

