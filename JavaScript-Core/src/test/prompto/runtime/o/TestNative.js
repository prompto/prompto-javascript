require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedCategory = function(test) {
	checkInterpretedOutput(test, "native/category.poc");
};

exports.testTranspiledCategory = function(test) {
	checkTranspiledOutput(test, "native/category.poc");
};

exports.testInterpretedCategoryReturn = function(test) {
	checkInterpretedOutput(test, "native/categoryReturn.poc");
};

exports.testTranspiledCategoryReturn = function(test) {
	checkTranspiledOutput(test, "native/categoryReturn.poc");
};

exports.testInterpretedMethod = function(test) {
	checkInterpretedOutput(test, "native/method.poc");
};

exports.testTranspiledMethod = function(test) {
	checkTranspiledOutput(test, "native/method.poc");
};

exports.testInterpretedReturnBooleanLiteral = function(test) {
	checkInterpretedOutput(test, "native/returnBooleanLiteral.poc");
};

exports.testTranspiledReturnBooleanLiteral = function(test) {
	checkTranspiledOutput(test, "native/returnBooleanLiteral.poc");
};

exports.testInterpretedReturnBooleanObject = function(test) {
	checkInterpretedOutput(test, "native/returnBooleanObject.poc");
};

exports.testTranspiledReturnBooleanObject = function(test) {
	checkTranspiledOutput(test, "native/returnBooleanObject.poc");
};

exports.testInterpretedReturnBooleanValue = function(test) {
	checkInterpretedOutput(test, "native/returnBooleanValue.poc");
};

exports.testTranspiledReturnBooleanValue = function(test) {
	checkTranspiledOutput(test, "native/returnBooleanValue.poc");
};

exports.testInterpretedReturnCharacterLiteral = function(test) {
	checkInterpretedOutput(test, "native/returnCharacterLiteral.poc");
};

exports.testTranspiledReturnCharacterLiteral = function(test) {
	checkTranspiledOutput(test, "native/returnCharacterLiteral.poc");
};

exports.testInterpretedReturnCharacterObject = function(test) {
	checkInterpretedOutput(test, "native/returnCharacterObject.poc");
};

exports.testTranspiledReturnCharacterObject = function(test) {
	checkTranspiledOutput(test, "native/returnCharacterObject.poc");
};

exports.testInterpretedReturnCharacterValue = function(test) {
	checkInterpretedOutput(test, "native/returnCharacterValue.poc");
};

exports.testTranspiledReturnCharacterValue = function(test) {
	checkTranspiledOutput(test, "native/returnCharacterValue.poc");
};

exports.testInterpretedReturnDecimalLiteral = function(test) {
	checkInterpretedOutput(test, "native/returnDecimalLiteral.poc");
};

exports.testTranspiledReturnDecimalLiteral = function(test) {
	checkTranspiledOutput(test, "native/returnDecimalLiteral.poc");
};

exports.testInterpretedReturnIntegerLiteral = function(test) {
	checkInterpretedOutput(test, "native/returnIntegerLiteral.poc");
};

exports.testTranspiledReturnIntegerLiteral = function(test) {
	checkTranspiledOutput(test, "native/returnIntegerLiteral.poc");
};

exports.testInterpretedReturnIntegerObject = function(test) {
	checkInterpretedOutput(test, "native/returnIntegerObject.poc");
};

exports.testTranspiledReturnIntegerObject = function(test) {
	checkTranspiledOutput(test, "native/returnIntegerObject.poc");
};

exports.testInterpretedReturnIntegerValue = function(test) {
	checkInterpretedOutput(test, "native/returnIntegerValue.poc");
};

exports.testTranspiledReturnIntegerValue = function(test) {
	checkTranspiledOutput(test, "native/returnIntegerValue.poc");
};

exports.testInterpretedReturnLongLiteral = function(test) {
	checkInterpretedOutput(test, "native/returnLongLiteral.poc");
};

exports.testTranspiledReturnLongLiteral = function(test) {
	checkTranspiledOutput(test, "native/returnLongLiteral.poc");
};

exports.testInterpretedReturnLongObject = function(test) {
	checkInterpretedOutput(test, "native/returnLongObject.poc");
};

exports.testTranspiledReturnLongObject = function(test) {
	checkTranspiledOutput(test, "native/returnLongObject.poc");
};

exports.testInterpretedReturnLongValue = function(test) {
	checkInterpretedOutput(test, "native/returnLongValue.poc");
};

exports.testTranspiledReturnLongValue = function(test) {
	checkTranspiledOutput(test, "native/returnLongValue.poc");
};

exports.testInterpretedReturnStringLiteral = function(test) {
	checkInterpretedOutput(test, "native/returnStringLiteral.poc");
};

exports.testTranspiledReturnStringLiteral = function(test) {
	checkTranspiledOutput(test, "native/returnStringLiteral.poc");
};

