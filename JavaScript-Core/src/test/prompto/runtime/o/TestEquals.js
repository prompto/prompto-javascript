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
	checkOutput(test, "equals/eqBoolean.poc");
};

exports.testEqCharacter = function(test) {
	checkOutput(test, "equals/eqCharacter.poc");
};

exports.testEqDate = function(test) {
	checkOutput(test, "equals/eqDate.poc");
};

exports.testEqDateTime = function(test) {
	checkOutput(test, "equals/eqDateTime.poc");
};

exports.testEqDecimal = function(test) {
	checkOutput(test, "equals/eqDecimal.poc");
};

exports.testEqDict = function(test) {
	checkOutput(test, "equals/eqDict.poc");
};

exports.testEqInteger = function(test) {
	checkOutput(test, "equals/eqInteger.poc");
};

exports.testEqList = function(test) {
	checkOutput(test, "equals/eqList.poc");
};

exports.testEqPeriod = function(test) {
	checkOutput(test, "equals/eqPeriod.poc");
};

exports.testEqRange = function(test) {
	checkOutput(test, "equals/eqRange.poc");
};

exports.testEqSet = function(test) {
	checkOutput(test, "equals/eqSet.poc");
};

exports.testEqText = function(test) {
	checkOutput(test, "equals/eqText.poc");
};

exports.testEqTime = function(test) {
	checkOutput(test, "equals/eqTime.poc");
};

exports.testIsBoolean = function(test) {
	checkOutput(test, "equals/isBoolean.poc");
};

exports.testIsInstance = function(test) {
	checkOutput(test, "equals/isInstance.poc");
};

exports.testIsNotBoolean = function(test) {
	checkOutput(test, "equals/isNotBoolean.poc");
};

exports.testIsNotInstance = function(test) {
	checkOutput(test, "equals/isNotInstance.poc");
};

exports.testNeqBoolean = function(test) {
	checkOutput(test, "equals/neqBoolean.poc");
};

exports.testNeqCharacter = function(test) {
	checkOutput(test, "equals/neqCharacter.poc");
};

exports.testNeqDate = function(test) {
	checkOutput(test, "equals/neqDate.poc");
};

exports.testNeqDateTime = function(test) {
	checkOutput(test, "equals/neqDateTime.poc");
};

exports.testNeqDecimal = function(test) {
	checkOutput(test, "equals/neqDecimal.poc");
};

exports.testNeqDict = function(test) {
	checkOutput(test, "equals/neqDict.poc");
};

exports.testNeqInteger = function(test) {
	checkOutput(test, "equals/neqInteger.poc");
};

exports.testNeqList = function(test) {
	checkOutput(test, "equals/neqList.poc");
};

exports.testNeqPeriod = function(test) {
	checkOutput(test, "equals/neqPeriod.poc");
};

exports.testNeqRange = function(test) {
	checkOutput(test, "equals/neqRange.poc");
};

exports.testNeqSet = function(test) {
	checkOutput(test, "equals/neqSet.poc");
};

exports.testNeqText = function(test) {
	checkOutput(test, "equals/neqText.poc");
};

exports.testNeqTime = function(test) {
	checkOutput(test, "equals/neqTime.poc");
};

exports.testReqText = function(test) {
	checkOutput(test, "equals/reqText.poc");
};

