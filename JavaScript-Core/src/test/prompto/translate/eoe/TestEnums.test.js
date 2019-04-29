require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCategoryEnum = function(test) {
	compareResourceEOE(test, "enums/categoryEnum.pec");
};

exports.testIntegerEnum = function(test) {
	compareResourceEOE(test, "enums/integerEnum.pec");
};

exports.testStoreCategoryEnum = function(test) {
	compareResourceEOE(test, "enums/storeCategoryEnum.pec");
};

exports.testStoreIntegerEnum = function(test) {
	compareResourceEOE(test, "enums/storeIntegerEnum.pec");
};

exports.testStoreTextEnum = function(test) {
	compareResourceEOE(test, "enums/storeTextEnum.pec");
};

exports.testTextEnum = function(test) {
	compareResourceEOE(test, "enums/textEnum.pec");
};

exports.testTextEnumArg = function(test) {
	compareResourceEOE(test, "enums/textEnumArg.pec");
};

exports.testTextEnumVar = function(test) {
	compareResourceEOE(test, "enums/textEnumVar.pec");
};

