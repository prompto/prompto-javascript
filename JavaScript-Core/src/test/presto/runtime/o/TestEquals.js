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

exports.testEqBoolean = function(test) {
	checkOutput(test, "equals/eqBoolean.o");
};

exports.testEqCharacter = function(test) {
	checkOutput(test, "equals/eqCharacter.o");
};

exports.testEqDate = function(test) {
	checkOutput(test, "equals/eqDate.o");
};

exports.testEqDateTime = function(test) {
	checkOutput(test, "equals/eqDateTime.o");
};

exports.testEqDecimal = function(test) {
	checkOutput(test, "equals/eqDecimal.o");
};

exports.testEqDict = function(test) {
	checkOutput(test, "equals/eqDict.o");
};

exports.testEqInteger = function(test) {
	checkOutput(test, "equals/eqInteger.o");
};

exports.testEqList = function(test) {
	checkOutput(test, "equals/eqList.o");
};

exports.testEqPeriod = function(test) {
	checkOutput(test, "equals/eqPeriod.o");
};

exports.testEqRange = function(test) {
	checkOutput(test, "equals/eqRange.o");
};

exports.testEqSet = function(test) {
	checkOutput(test, "equals/eqSet.o");
};

exports.testEqText = function(test) {
	checkOutput(test, "equals/eqText.o");
};

exports.testEqTime = function(test) {
	checkOutput(test, "equals/eqTime.o");
};

exports.testIsBoolean = function(test) {
	checkOutput(test, "equals/isBoolean.o");
};

exports.testIsInstance = function(test) {
	checkOutput(test, "equals/isInstance.o");
};

exports.testIsNotBoolean = function(test) {
	checkOutput(test, "equals/isNotBoolean.o");
};

exports.testIsNotInstance = function(test) {
	checkOutput(test, "equals/isNotInstance.o");
};

exports.testNeqBoolean = function(test) {
	checkOutput(test, "equals/neqBoolean.o");
};

exports.testNeqCharacter = function(test) {
	checkOutput(test, "equals/neqCharacter.o");
};

exports.testNeqDate = function(test) {
	checkOutput(test, "equals/neqDate.o");
};

exports.testNeqDateTime = function(test) {
	checkOutput(test, "equals/neqDateTime.o");
};

exports.testNeqDecimal = function(test) {
	checkOutput(test, "equals/neqDecimal.o");
};

exports.testNeqDict = function(test) {
	checkOutput(test, "equals/neqDict.o");
};

exports.testNeqInteger = function(test) {
	checkOutput(test, "equals/neqInteger.o");
};

exports.testNeqList = function(test) {
	checkOutput(test, "equals/neqList.o");
};

exports.testNeqPeriod = function(test) {
	checkOutput(test, "equals/neqPeriod.o");
};

exports.testNeqRange = function(test) {
	checkOutput(test, "equals/neqRange.o");
};

exports.testNeqSet = function(test) {
	checkOutput(test, "equals/neqSet.o");
};

exports.testNeqText = function(test) {
	checkOutput(test, "equals/neqText.o");
};

exports.testNeqTime = function(test) {
	checkOutput(test, "equals/neqTime.o");
};

exports.testReqText = function(test) {
	checkOutput(test, "equals/reqText.o");
};

