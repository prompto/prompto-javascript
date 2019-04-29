require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testCategory = function(test) {
	compareResourceOMO(test, "native/category.poc");
};

exports.testCategoryReturn = function(test) {
	compareResourceOMO(test, "native/categoryReturn.poc");
};

exports.testMethod = function(test) {
	compareResourceOMO(test, "native/method.poc");
};

exports.testReturn = function(test) {
	compareResourceOMO(test, "native/return.poc");
};

exports.testReturnBooleanLiteral = function(test) {
	compareResourceOMO(test, "native/returnBooleanLiteral.poc");
};

exports.testReturnBooleanObject = function(test) {
	compareResourceOMO(test, "native/returnBooleanObject.poc");
};

exports.testReturnBooleanValue = function(test) {
	compareResourceOMO(test, "native/returnBooleanValue.poc");
};

exports.testReturnCharacterLiteral = function(test) {
	compareResourceOMO(test, "native/returnCharacterLiteral.poc");
};

exports.testReturnCharacterObject = function(test) {
	compareResourceOMO(test, "native/returnCharacterObject.poc");
};

exports.testReturnCharacterValue = function(test) {
	compareResourceOMO(test, "native/returnCharacterValue.poc");
};

exports.testReturnDecimalLiteral = function(test) {
	compareResourceOMO(test, "native/returnDecimalLiteral.poc");
};

exports.testReturnIntegerLiteral = function(test) {
	compareResourceOMO(test, "native/returnIntegerLiteral.poc");
};

exports.testReturnIntegerObject = function(test) {
	compareResourceOMO(test, "native/returnIntegerObject.poc");
};

exports.testReturnIntegerValue = function(test) {
	compareResourceOMO(test, "native/returnIntegerValue.poc");
};

exports.testReturnLongLiteral = function(test) {
	compareResourceOMO(test, "native/returnLongLiteral.poc");
};

exports.testReturnLongObject = function(test) {
	compareResourceOMO(test, "native/returnLongObject.poc");
};

exports.testReturnLongValue = function(test) {
	compareResourceOMO(test, "native/returnLongValue.poc");
};

exports.testReturnStringLiteral = function(test) {
	compareResourceOMO(test, "native/returnStringLiteral.poc");
};

