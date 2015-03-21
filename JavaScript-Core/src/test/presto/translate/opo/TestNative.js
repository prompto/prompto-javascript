require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testCategory = function(test) {
	compareResourceOPO(test, "native/category.o");
};

exports.testMethod = function(test) {
	compareResourceOPO(test, "native/method.o");
};

exports.testReturn = function(test) {
	compareResourceOPO(test, "native/return.o");
};

exports.testReturnBooleanLiteral = function(test) {
	compareResourceOPO(test, "native/returnBooleanLiteral.o");
};

exports.testReturnBooleanObject = function(test) {
	compareResourceOPO(test, "native/returnBooleanObject.o");
};

exports.testReturnBooleanValue = function(test) {
	compareResourceOPO(test, "native/returnBooleanValue.o");
};

exports.testReturnCharacterLiteral = function(test) {
	compareResourceOPO(test, "native/returnCharacterLiteral.o");
};

exports.testReturnCharacterObject = function(test) {
	compareResourceOPO(test, "native/returnCharacterObject.o");
};

exports.testReturnCharacterValue = function(test) {
	compareResourceOPO(test, "native/returnCharacterValue.o");
};

exports.testReturnDecimalLiteral = function(test) {
	compareResourceOPO(test, "native/returnDecimalLiteral.o");
};

exports.testReturnIntegerLiteral = function(test) {
	compareResourceOPO(test, "native/returnIntegerLiteral.o");
};

exports.testReturnIntegerObject = function(test) {
	compareResourceOPO(test, "native/returnIntegerObject.o");
};

exports.testReturnIntegerValue = function(test) {
	compareResourceOPO(test, "native/returnIntegerValue.o");
};

exports.testReturnLongObject = function(test) {
	compareResourceOPO(test, "native/returnLongObject.o");
};

exports.testReturnLongValue = function(test) {
	compareResourceOPO(test, "native/returnLongValue.o");
};

exports.testReturnStringLiteral = function(test) {
	compareResourceOPO(test, "native/returnStringLiteral.o");
};

