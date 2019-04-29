require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedEqBoolean = function(test) {
	checkInterpretedOutput(test, "equals/eqBoolean.pec");
};

exports.testTranspiledEqBoolean = function(test) {
	checkTranspiledOutput(test, "equals/eqBoolean.pec");
};

exports.testInterpretedEqCharacter = function(test) {
	checkInterpretedOutput(test, "equals/eqCharacter.pec");
};

exports.testTranspiledEqCharacter = function(test) {
	checkTranspiledOutput(test, "equals/eqCharacter.pec");
};

exports.testInterpretedEqDate = function(test) {
	checkInterpretedOutput(test, "equals/eqDate.pec");
};

exports.testTranspiledEqDate = function(test) {
	checkTranspiledOutput(test, "equals/eqDate.pec");
};

exports.testInterpretedEqDateTime = function(test) {
	checkInterpretedOutput(test, "equals/eqDateTime.pec");
};

exports.testTranspiledEqDateTime = function(test) {
	checkTranspiledOutput(test, "equals/eqDateTime.pec");
};

exports.testInterpretedEqDecimal = function(test) {
	checkInterpretedOutput(test, "equals/eqDecimal.pec");
};

exports.testTranspiledEqDecimal = function(test) {
	checkTranspiledOutput(test, "equals/eqDecimal.pec");
};

exports.testInterpretedEqDict = function(test) {
	checkInterpretedOutput(test, "equals/eqDict.pec");
};

exports.testTranspiledEqDict = function(test) {
	checkTranspiledOutput(test, "equals/eqDict.pec");
};

exports.testInterpretedEqInteger = function(test) {
	checkInterpretedOutput(test, "equals/eqInteger.pec");
};

exports.testTranspiledEqInteger = function(test) {
	checkTranspiledOutput(test, "equals/eqInteger.pec");
};

exports.testInterpretedEqList = function(test) {
	checkInterpretedOutput(test, "equals/eqList.pec");
};

exports.testTranspiledEqList = function(test) {
	checkTranspiledOutput(test, "equals/eqList.pec");
};

exports.testInterpretedEqPeriod = function(test) {
	checkInterpretedOutput(test, "equals/eqPeriod.pec");
};

exports.testTranspiledEqPeriod = function(test) {
	checkTranspiledOutput(test, "equals/eqPeriod.pec");
};

exports.testInterpretedEqRange = function(test) {
	checkInterpretedOutput(test, "equals/eqRange.pec");
};

exports.testTranspiledEqRange = function(test) {
	checkTranspiledOutput(test, "equals/eqRange.pec");
};

exports.testInterpretedEqSet = function(test) {
	checkInterpretedOutput(test, "equals/eqSet.pec");
};

exports.testTranspiledEqSet = function(test) {
	checkTranspiledOutput(test, "equals/eqSet.pec");
};

exports.testInterpretedEqText = function(test) {
	checkInterpretedOutput(test, "equals/eqText.pec");
};

exports.testTranspiledEqText = function(test) {
	checkTranspiledOutput(test, "equals/eqText.pec");
};

exports.testInterpretedEqTime = function(test) {
	checkInterpretedOutput(test, "equals/eqTime.pec");
};

exports.testTranspiledEqTime = function(test) {
	checkTranspiledOutput(test, "equals/eqTime.pec");
};

exports.testInterpretedEqVersion = function(test) {
	checkInterpretedOutput(test, "equals/eqVersion.pec");
};

exports.testTranspiledEqVersion = function(test) {
	checkTranspiledOutput(test, "equals/eqVersion.pec");
};

exports.testInterpretedIsBoolean = function(test) {
	checkInterpretedOutput(test, "equals/isBoolean.pec");
};

exports.testTranspiledIsBoolean = function(test) {
	checkTranspiledOutput(test, "equals/isBoolean.pec");
};

exports.testInterpretedIsInstance = function(test) {
	checkInterpretedOutput(test, "equals/isInstance.pec");
};

exports.testTranspiledIsInstance = function(test) {
	checkTranspiledOutput(test, "equals/isInstance.pec");
};

exports.testInterpretedIsNotBoolean = function(test) {
	checkInterpretedOutput(test, "equals/isNotBoolean.pec");
};

exports.testTranspiledIsNotBoolean = function(test) {
	checkTranspiledOutput(test, "equals/isNotBoolean.pec");
};

exports.testInterpretedIsNotInstance = function(test) {
	checkInterpretedOutput(test, "equals/isNotInstance.pec");
};

exports.testTranspiledIsNotInstance = function(test) {
	checkTranspiledOutput(test, "equals/isNotInstance.pec");
};

exports.testInterpretedNeqBoolean = function(test) {
	checkInterpretedOutput(test, "equals/neqBoolean.pec");
};

exports.testTranspiledNeqBoolean = function(test) {
	checkTranspiledOutput(test, "equals/neqBoolean.pec");
};

exports.testInterpretedNeqCharacter = function(test) {
	checkInterpretedOutput(test, "equals/neqCharacter.pec");
};

exports.testTranspiledNeqCharacter = function(test) {
	checkTranspiledOutput(test, "equals/neqCharacter.pec");
};

exports.testInterpretedNeqDate = function(test) {
	checkInterpretedOutput(test, "equals/neqDate.pec");
};

exports.testTranspiledNeqDate = function(test) {
	checkTranspiledOutput(test, "equals/neqDate.pec");
};

exports.testInterpretedNeqDateTime = function(test) {
	checkInterpretedOutput(test, "equals/neqDateTime.pec");
};

exports.testTranspiledNeqDateTime = function(test) {
	checkTranspiledOutput(test, "equals/neqDateTime.pec");
};

exports.testInterpretedNeqDecimal = function(test) {
	checkInterpretedOutput(test, "equals/neqDecimal.pec");
};

exports.testTranspiledNeqDecimal = function(test) {
	checkTranspiledOutput(test, "equals/neqDecimal.pec");
};

exports.testInterpretedNeqDict = function(test) {
	checkInterpretedOutput(test, "equals/neqDict.pec");
};

exports.testTranspiledNeqDict = function(test) {
	checkTranspiledOutput(test, "equals/neqDict.pec");
};

exports.testInterpretedNeqInteger = function(test) {
	checkInterpretedOutput(test, "equals/neqInteger.pec");
};

exports.testTranspiledNeqInteger = function(test) {
	checkTranspiledOutput(test, "equals/neqInteger.pec");
};

exports.testInterpretedNeqList = function(test) {
	checkInterpretedOutput(test, "equals/neqList.pec");
};

exports.testTranspiledNeqList = function(test) {
	checkTranspiledOutput(test, "equals/neqList.pec");
};

exports.testInterpretedNeqPeriod = function(test) {
	checkInterpretedOutput(test, "equals/neqPeriod.pec");
};

exports.testTranspiledNeqPeriod = function(test) {
	checkTranspiledOutput(test, "equals/neqPeriod.pec");
};

exports.testInterpretedNeqRange = function(test) {
	checkInterpretedOutput(test, "equals/neqRange.pec");
};

exports.testTranspiledNeqRange = function(test) {
	checkTranspiledOutput(test, "equals/neqRange.pec");
};

exports.testInterpretedNeqSet = function(test) {
	checkInterpretedOutput(test, "equals/neqSet.pec");
};

exports.testTranspiledNeqSet = function(test) {
	checkTranspiledOutput(test, "equals/neqSet.pec");
};

exports.testInterpretedNeqText = function(test) {
	checkInterpretedOutput(test, "equals/neqText.pec");
};

exports.testTranspiledNeqText = function(test) {
	checkTranspiledOutput(test, "equals/neqText.pec");
};

exports.testInterpretedNeqTime = function(test) {
	checkInterpretedOutput(test, "equals/neqTime.pec");
};

exports.testTranspiledNeqTime = function(test) {
	checkTranspiledOutput(test, "equals/neqTime.pec");
};

exports.testInterpretedReqText = function(test) {
	checkInterpretedOutput(test, "equals/reqText.pec");
};

exports.testTranspiledReqText = function(test) {
	checkTranspiledOutput(test, "equals/reqText.pec");
};

