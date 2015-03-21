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
	checkOutput(test, "native/category.o");
};

exports.testMethod = function(test) {
	checkOutput(test, "native/method.o");
};

exports.testReturnBooleanLiteral = function(test) {
	checkOutput(test, "native/returnBooleanLiteral.o");
};

exports.testReturnBooleanObject = function(test) {
	checkOutput(test, "native/returnBooleanObject.o");
};

exports.testReturnBooleanValue = function(test) {
	checkOutput(test, "native/returnBooleanValue.o");
};

exports.testReturnCharacterLiteral = function(test) {
	checkOutput(test, "native/returnCharacterLiteral.o");
};

exports.testReturnCharacterObject = function(test) {
	checkOutput(test, "native/returnCharacterObject.o");
};

exports.testReturnCharacterValue = function(test) {
	checkOutput(test, "native/returnCharacterValue.o");
};

exports.testReturnDecimalLiteral = function(test) {
	checkOutput(test, "native/returnDecimalLiteral.o");
};

exports.testReturnIntegerLiteral = function(test) {
	checkOutput(test, "native/returnIntegerLiteral.o");
};

exports.testReturnIntegerObject = function(test) {
	checkOutput(test, "native/returnIntegerObject.o");
};

exports.testReturnIntegerValue = function(test) {
	checkOutput(test, "native/returnIntegerValue.o");
};

exports.testReturnLongObject = function(test) {
	checkOutput(test, "native/returnLongObject.o");
};

exports.testReturnLongValue = function(test) {
	checkOutput(test, "native/returnLongValue.o");
};

exports.testReturnStringLiteral = function(test) {
	checkOutput(test, "native/returnStringLiteral.o");
};

