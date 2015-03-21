require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testEqBoolean = function(test) {
	checkOutput(test, "equals/eqBoolean.e");
};

exports.testEqCharacter = function(test) {
	checkOutput(test, "equals/eqCharacter.e");
};

exports.testEqDate = function(test) {
	checkOutput(test, "equals/eqDate.e");
};

exports.testEqDateTime = function(test) {
	checkOutput(test, "equals/eqDateTime.e");
};

exports.testEqDecimal = function(test) {
	checkOutput(test, "equals/eqDecimal.e");
};

exports.testEqDict = function(test) {
	checkOutput(test, "equals/eqDict.e");
};

exports.testEqInteger = function(test) {
	checkOutput(test, "equals/eqInteger.e");
};

exports.testEqList = function(test) {
	checkOutput(test, "equals/eqList.e");
};

exports.testEqPeriod = function(test) {
	checkOutput(test, "equals/eqPeriod.e");
};

exports.testEqRange = function(test) {
	checkOutput(test, "equals/eqRange.e");
};

exports.testEqSet = function(test) {
	checkOutput(test, "equals/eqSet.e");
};

exports.testEqText = function(test) {
	checkOutput(test, "equals/eqText.e");
};

exports.testEqTime = function(test) {
	checkOutput(test, "equals/eqTime.e");
};

exports.testIsBoolean = function(test) {
	checkOutput(test, "equals/isBoolean.e");
};

exports.testIsInstance = function(test) {
	checkOutput(test, "equals/isInstance.e");
};

exports.testIsNotBoolean = function(test) {
	checkOutput(test, "equals/isNotBoolean.e");
};

exports.testIsNotInstance = function(test) {
	checkOutput(test, "equals/isNotInstance.e");
};

exports.testNeqBoolean = function(test) {
	checkOutput(test, "equals/neqBoolean.e");
};

exports.testNeqCharacter = function(test) {
	checkOutput(test, "equals/neqCharacter.e");
};

exports.testNeqDate = function(test) {
	checkOutput(test, "equals/neqDate.e");
};

exports.testNeqDateTime = function(test) {
	checkOutput(test, "equals/neqDateTime.e");
};

exports.testNeqDecimal = function(test) {
	checkOutput(test, "equals/neqDecimal.e");
};

exports.testNeqDict = function(test) {
	checkOutput(test, "equals/neqDict.e");
};

exports.testNeqInteger = function(test) {
	checkOutput(test, "equals/neqInteger.e");
};

exports.testNeqList = function(test) {
	checkOutput(test, "equals/neqList.e");
};

exports.testNeqPeriod = function(test) {
	checkOutput(test, "equals/neqPeriod.e");
};

exports.testNeqRange = function(test) {
	checkOutput(test, "equals/neqRange.e");
};

exports.testNeqSet = function(test) {
	checkOutput(test, "equals/neqSet.e");
};

exports.testNeqText = function(test) {
	checkOutput(test, "equals/neqText.e");
};

exports.testNeqTime = function(test) {
	checkOutput(test, "equals/neqTime.e");
};

exports.testReqText = function(test) {
	checkOutput(test, "equals/reqText.e");
};

