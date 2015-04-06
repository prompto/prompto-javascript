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
	checkOutput(test, "equals/eqBoolean.pec");
};

exports.testEqCharacter = function(test) {
	checkOutput(test, "equals/eqCharacter.pec");
};

exports.testEqDate = function(test) {
	checkOutput(test, "equals/eqDate.pec");
};

exports.testEqDateTime = function(test) {
	checkOutput(test, "equals/eqDateTime.pec");
};

exports.testEqDecimal = function(test) {
	checkOutput(test, "equals/eqDecimal.pec");
};

exports.testEqDict = function(test) {
	checkOutput(test, "equals/eqDict.pec");
};

exports.testEqInteger = function(test) {
	checkOutput(test, "equals/eqInteger.pec");
};

exports.testEqList = function(test) {
	checkOutput(test, "equals/eqList.pec");
};

exports.testEqPeriod = function(test) {
	checkOutput(test, "equals/eqPeriod.pec");
};

exports.testEqRange = function(test) {
	checkOutput(test, "equals/eqRange.pec");
};

exports.testEqSet = function(test) {
	checkOutput(test, "equals/eqSet.pec");
};

exports.testEqText = function(test) {
	checkOutput(test, "equals/eqText.pec");
};

exports.testEqTime = function(test) {
	checkOutput(test, "equals/eqTime.pec");
};

exports.testIsBoolean = function(test) {
	checkOutput(test, "equals/isBoolean.pec");
};

exports.testIsInstance = function(test) {
	checkOutput(test, "equals/isInstance.pec");
};

exports.testIsNotBoolean = function(test) {
	checkOutput(test, "equals/isNotBoolean.pec");
};

exports.testIsNotInstance = function(test) {
	checkOutput(test, "equals/isNotInstance.pec");
};

exports.testNeqBoolean = function(test) {
	checkOutput(test, "equals/neqBoolean.pec");
};

exports.testNeqCharacter = function(test) {
	checkOutput(test, "equals/neqCharacter.pec");
};

exports.testNeqDate = function(test) {
	checkOutput(test, "equals/neqDate.pec");
};

exports.testNeqDateTime = function(test) {
	checkOutput(test, "equals/neqDateTime.pec");
};

exports.testNeqDecimal = function(test) {
	checkOutput(test, "equals/neqDecimal.pec");
};

exports.testNeqDict = function(test) {
	checkOutput(test, "equals/neqDict.pec");
};

exports.testNeqInteger = function(test) {
	checkOutput(test, "equals/neqInteger.pec");
};

exports.testNeqList = function(test) {
	checkOutput(test, "equals/neqList.pec");
};

exports.testNeqPeriod = function(test) {
	checkOutput(test, "equals/neqPeriod.pec");
};

exports.testNeqRange = function(test) {
	checkOutput(test, "equals/neqRange.pec");
};

exports.testNeqSet = function(test) {
	checkOutput(test, "equals/neqSet.pec");
};

exports.testNeqText = function(test) {
	checkOutput(test, "equals/neqText.pec");
};

exports.testNeqTime = function(test) {
	checkOutput(test, "equals/neqTime.pec");
};

exports.testReqText = function(test) {
	checkOutput(test, "equals/reqText.pec");
};

