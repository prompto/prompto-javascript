require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCategory = function(test) {
	compareResourceOEO(test, "native/category.o");
};

exports.testMethod = function(test) {
	compareResourceOEO(test, "native/method.o");
};

exports.testReturn = function(test) {
	compareResourceOEO(test, "native/return.o");
};

exports.testReturnBooleanLiteral = function(test) {
	compareResourceOEO(test, "native/returnBooleanLiteral.o");
};

exports.testReturnBooleanObject = function(test) {
	compareResourceOEO(test, "native/returnBooleanObject.o");
};

exports.testReturnBooleanValue = function(test) {
	compareResourceOEO(test, "native/returnBooleanValue.o");
};

exports.testReturnCharacterLiteral = function(test) {
	compareResourceOEO(test, "native/returnCharacterLiteral.o");
};

exports.testReturnCharacterObject = function(test) {
	compareResourceOEO(test, "native/returnCharacterObject.o");
};

exports.testReturnCharacterValue = function(test) {
	compareResourceOEO(test, "native/returnCharacterValue.o");
};

exports.testReturnDecimalLiteral = function(test) {
	compareResourceOEO(test, "native/returnDecimalLiteral.o");
};

exports.testReturnIntegerLiteral = function(test) {
	compareResourceOEO(test, "native/returnIntegerLiteral.o");
};

exports.testReturnIntegerObject = function(test) {
	compareResourceOEO(test, "native/returnIntegerObject.o");
};

exports.testReturnIntegerValue = function(test) {
	compareResourceOEO(test, "native/returnIntegerValue.o");
};

exports.testReturnLongObject = function(test) {
	compareResourceOEO(test, "native/returnLongObject.o");
};

exports.testReturnLongValue = function(test) {
	compareResourceOEO(test, "native/returnLongValue.o");
};

exports.testReturnStringLiteral = function(test) {
	compareResourceOEO(test, "native/returnStringLiteral.o");
};

