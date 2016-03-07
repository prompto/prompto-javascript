require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCategory = function(test) {
	compareResourceOEO(test, "native/category.poc");
};

exports.testMethod = function(test) {
	compareResourceOEO(test, "native/method.poc");
};

exports.testReturn = function(test) {
	compareResourceOEO(test, "native/return.poc");
};

exports.testReturnBooleanLiteral = function(test) {
	compareResourceOEO(test, "native/returnBooleanLiteral.poc");
};

exports.testReturnBooleanObject = function(test) {
	compareResourceOEO(test, "native/returnBooleanObject.poc");
};

exports.testReturnBooleanValue = function(test) {
	compareResourceOEO(test, "native/returnBooleanValue.poc");
};

exports.testReturnCharacterLiteral = function(test) {
	compareResourceOEO(test, "native/returnCharacterLiteral.poc");
};

exports.testReturnCharacterObject = function(test) {
	compareResourceOEO(test, "native/returnCharacterObject.poc");
};

exports.testReturnCharacterValue = function(test) {
	compareResourceOEO(test, "native/returnCharacterValue.poc");
};

exports.testReturnDecimalLiteral = function(test) {
	compareResourceOEO(test, "native/returnDecimalLiteral.poc");
};

exports.testReturnIntegerLiteral = function(test) {
	compareResourceOEO(test, "native/returnIntegerLiteral.poc");
};

exports.testReturnIntegerObject = function(test) {
	compareResourceOEO(test, "native/returnIntegerObject.poc");
};

exports.testReturnIntegerValue = function(test) {
	compareResourceOEO(test, "native/returnIntegerValue.poc");
};

exports.testReturnLongLiteral = function(test) {
	compareResourceOEO(test, "native/returnLongLiteral.poc");
};

exports.testReturnLongObject = function(test) {
	compareResourceOEO(test, "native/returnLongObject.poc");
};

exports.testReturnLongValue = function(test) {
	compareResourceOEO(test, "native/returnLongValue.poc");
};

exports.testReturnStringLiteral = function(test) {
	compareResourceOEO(test, "native/returnStringLiteral.poc");
};

