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

exports.testInterpretedEqBoolean = function(test) {
	checkInterpretedOutput(test, "equals/eqBoolean.poc");
};

exports.testTranspiledEqBoolean = function(test) {
	checkTranspiledOutput(test, "equals/eqBoolean.poc");
};

exports.testInterpretedEqCharacter = function(test) {
	checkInterpretedOutput(test, "equals/eqCharacter.poc");
};

exports.testTranspiledEqCharacter = function(test) {
	checkTranspiledOutput(test, "equals/eqCharacter.poc");
};

exports.testInterpretedEqDate = function(test) {
	checkInterpretedOutput(test, "equals/eqDate.poc");
};

exports.testTranspiledEqDate = function(test) {
	checkTranspiledOutput(test, "equals/eqDate.poc");
};

exports.testInterpretedEqDateTime = function(test) {
	checkInterpretedOutput(test, "equals/eqDateTime.poc");
};

exports.testTranspiledEqDateTime = function(test) {
	checkTranspiledOutput(test, "equals/eqDateTime.poc");
};

exports.testInterpretedEqDecimal = function(test) {
	checkInterpretedOutput(test, "equals/eqDecimal.poc");
};

exports.testTranspiledEqDecimal = function(test) {
	checkTranspiledOutput(test, "equals/eqDecimal.poc");
};

exports.testInterpretedEqDict = function(test) {
	checkInterpretedOutput(test, "equals/eqDict.poc");
};

exports.testTranspiledEqDict = function(test) {
	checkTranspiledOutput(test, "equals/eqDict.poc");
};

exports.testInterpretedEqInteger = function(test) {
	checkInterpretedOutput(test, "equals/eqInteger.poc");
};

exports.testTranspiledEqInteger = function(test) {
	checkTranspiledOutput(test, "equals/eqInteger.poc");
};

exports.testInterpretedEqList = function(test) {
	checkInterpretedOutput(test, "equals/eqList.poc");
};

exports.testTranspiledEqList = function(test) {
	checkTranspiledOutput(test, "equals/eqList.poc");
};

exports.testInterpretedEqPeriod = function(test) {
	checkInterpretedOutput(test, "equals/eqPeriod.poc");
};

exports.testTranspiledEqPeriod = function(test) {
	checkTranspiledOutput(test, "equals/eqPeriod.poc");
};

exports.testInterpretedEqRange = function(test) {
	checkInterpretedOutput(test, "equals/eqRange.poc");
};

exports.testTranspiledEqRange = function(test) {
	checkTranspiledOutput(test, "equals/eqRange.poc");
};

exports.testInterpretedEqSet = function(test) {
	checkInterpretedOutput(test, "equals/eqSet.poc");
};

exports.testTranspiledEqSet = function(test) {
	checkTranspiledOutput(test, "equals/eqSet.poc");
};

exports.testInterpretedEqText = function(test) {
	checkInterpretedOutput(test, "equals/eqText.poc");
};

exports.testTranspiledEqText = function(test) {
	checkTranspiledOutput(test, "equals/eqText.poc");
};

exports.testInterpretedEqTime = function(test) {
	checkInterpretedOutput(test, "equals/eqTime.poc");
};

exports.testTranspiledEqTime = function(test) {
	checkTranspiledOutput(test, "equals/eqTime.poc");
};

exports.testInterpretedEqVersion = function(test) {
	checkInterpretedOutput(test, "equals/eqVersion.poc");
};

exports.testTranspiledEqVersion = function(test) {
	checkTranspiledOutput(test, "equals/eqVersion.poc");
};

exports.testInterpretedIsBoolean = function(test) {
	checkInterpretedOutput(test, "equals/isBoolean.poc");
};

exports.testTranspiledIsBoolean = function(test) {
	checkTranspiledOutput(test, "equals/isBoolean.poc");
};

exports.testInterpretedIsInstance = function(test) {
	checkInterpretedOutput(test, "equals/isInstance.poc");
};

exports.testTranspiledIsInstance = function(test) {
	checkTranspiledOutput(test, "equals/isInstance.poc");
};

exports.testInterpretedIsNotBoolean = function(test) {
	checkInterpretedOutput(test, "equals/isNotBoolean.poc");
};

exports.testTranspiledIsNotBoolean = function(test) {
	checkTranspiledOutput(test, "equals/isNotBoolean.poc");
};

exports.testInterpretedIsNotInstance = function(test) {
	checkInterpretedOutput(test, "equals/isNotInstance.poc");
};

exports.testTranspiledIsNotInstance = function(test) {
	checkTranspiledOutput(test, "equals/isNotInstance.poc");
};

exports.testInterpretedNeqBoolean = function(test) {
	checkInterpretedOutput(test, "equals/neqBoolean.poc");
};

exports.testTranspiledNeqBoolean = function(test) {
	checkTranspiledOutput(test, "equals/neqBoolean.poc");
};

exports.testInterpretedNeqCharacter = function(test) {
	checkInterpretedOutput(test, "equals/neqCharacter.poc");
};

exports.testTranspiledNeqCharacter = function(test) {
	checkTranspiledOutput(test, "equals/neqCharacter.poc");
};

exports.testInterpretedNeqDate = function(test) {
	checkInterpretedOutput(test, "equals/neqDate.poc");
};

exports.testTranspiledNeqDate = function(test) {
	checkTranspiledOutput(test, "equals/neqDate.poc");
};

exports.testInterpretedNeqDateTime = function(test) {
	checkInterpretedOutput(test, "equals/neqDateTime.poc");
};

exports.testTranspiledNeqDateTime = function(test) {
	checkTranspiledOutput(test, "equals/neqDateTime.poc");
};

exports.testInterpretedNeqDecimal = function(test) {
	checkInterpretedOutput(test, "equals/neqDecimal.poc");
};

exports.testTranspiledNeqDecimal = function(test) {
	checkTranspiledOutput(test, "equals/neqDecimal.poc");
};

exports.testInterpretedNeqDict = function(test) {
	checkInterpretedOutput(test, "equals/neqDict.poc");
};

exports.testTranspiledNeqDict = function(test) {
	checkTranspiledOutput(test, "equals/neqDict.poc");
};

exports.testInterpretedNeqInteger = function(test) {
	checkInterpretedOutput(test, "equals/neqInteger.poc");
};

exports.testTranspiledNeqInteger = function(test) {
	checkTranspiledOutput(test, "equals/neqInteger.poc");
};

exports.testInterpretedNeqList = function(test) {
	checkInterpretedOutput(test, "equals/neqList.poc");
};

exports.testTranspiledNeqList = function(test) {
	checkTranspiledOutput(test, "equals/neqList.poc");
};

exports.testInterpretedNeqPeriod = function(test) {
	checkInterpretedOutput(test, "equals/neqPeriod.poc");
};

exports.testTranspiledNeqPeriod = function(test) {
	checkTranspiledOutput(test, "equals/neqPeriod.poc");
};

exports.testInterpretedNeqRange = function(test) {
	checkInterpretedOutput(test, "equals/neqRange.poc");
};

exports.testTranspiledNeqRange = function(test) {
	checkTranspiledOutput(test, "equals/neqRange.poc");
};

exports.testInterpretedNeqSet = function(test) {
	checkInterpretedOutput(test, "equals/neqSet.poc");
};

exports.testTranspiledNeqSet = function(test) {
	checkTranspiledOutput(test, "equals/neqSet.poc");
};

exports.testInterpretedNeqText = function(test) {
	checkInterpretedOutput(test, "equals/neqText.poc");
};

exports.testTranspiledNeqText = function(test) {
	checkTranspiledOutput(test, "equals/neqText.poc");
};

exports.testInterpretedNeqTime = function(test) {
	checkInterpretedOutput(test, "equals/neqTime.poc");
};

exports.testTranspiledNeqTime = function(test) {
	checkTranspiledOutput(test, "equals/neqTime.poc");
};

exports.testInterpretedReqText = function(test) {
	checkInterpretedOutput(test, "equals/reqText.poc");
};

exports.testTranspiledReqText = function(test) {
	checkTranspiledOutput(test, "equals/reqText.poc");
};

