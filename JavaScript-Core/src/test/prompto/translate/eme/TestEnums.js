require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testCategoryEnum = function(test) {
	compareResourceEME(test, "enums/categoryEnum.pec");
};

exports.testIntegerEnum = function(test) {
	compareResourceEME(test, "enums/integerEnum.pec");
};

exports.testStoreCategoryEnum = function(test) {
	compareResourceEME(test, "enums/storeCategoryEnum.pec");
};

exports.testStoreIntegerEnum = function(test) {
	compareResourceEME(test, "enums/storeIntegerEnum.pec");
};

exports.testStoreTextEnum = function(test) {
	compareResourceEME(test, "enums/storeTextEnum.pec");
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

