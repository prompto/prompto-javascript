require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testCategory = function(test) {
	checkOutput(test, "native/category.poc");
};

exports.testMethod = function(test) {
	checkOutput(test, "native/method.poc");
};

exports.testReturnBooleanLiteral = function(test) {
	checkOutput(test, "native/returnBooleanLiteral.poc");
};

exports.testReturnBooleanObject = function(test) {
	checkOutput(test, "native/returnBooleanObject.poc");
};

exports.testReturnBooleanValue = function(test) {
	checkOutput(test, "native/returnBooleanValue.poc");
};

exports.testReturnCharacterLiteral = function(test) {
	checkOutput(test, "native/returnCharacterLiteral.poc");
};

exports.testReturnCharacterObject = function(test) {
	checkOutput(test, "native/returnCharacterObject.poc");
};

exports.testReturnCharacterValue = function(test) {
	checkOutput(test, "native/returnCharacterValue.poc");
};

exports.testReturnDecimalLiteral = function(test) {
	checkOutput(test, "native/returnDecimalLiteral.poc");
};

exports.testReturnIntegerLiteral = function(test) {
	checkOutput(test, "native/returnIntegerLiteral.poc");
};

exports.testReturnIntegerObject = function(test) {
	checkOutput(test, "native/returnIntegerObject.poc");
};

exports.testReturnIntegerValue = function(test) {
	checkOutput(test, "native/returnIntegerValue.poc");
};

exports.testReturnLongLiteral = function(test) {
	checkOutput(test, "native/returnLongLiteral.poc");
};

exports.testReturnLongObject = function(test) {
	checkOutput(test, "native/returnLongObject.poc");
};

exports.testReturnLongValue = function(test) {
	checkOutput(test, "native/returnLongValue.poc");
};

exports.testReturnStringLiteral = function(test) {
	checkOutput(test, "native/returnStringLiteral.poc");
};

