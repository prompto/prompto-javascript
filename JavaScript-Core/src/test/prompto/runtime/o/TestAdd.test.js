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

exports.testInterpretedAddCharacter = function(test) {
	checkInterpretedOutput(test, "add/addCharacter.poc");
};

exports.testTranspiledAddCharacter = function(test) {
	checkTranspiledOutput(test, "add/addCharacter.poc");
};

exports.testInterpretedAddDate = function(test) {
	checkInterpretedOutput(test, "add/addDate.poc");
};

exports.testTranspiledAddDate = function(test) {
	checkTranspiledOutput(test, "add/addDate.poc");
};

exports.testInterpretedAddDateTime = function(test) {
	checkInterpretedOutput(test, "add/addDateTime.poc");
};

exports.testTranspiledAddDateTime = function(test) {
	checkTranspiledOutput(test, "add/addDateTime.poc");
};

exports.testInterpretedAddDecimal = function(test) {
	checkInterpretedOutput(test, "add/addDecimal.poc");
};

exports.testTranspiledAddDecimal = function(test) {
	checkTranspiledOutput(test, "add/addDecimal.poc");
};

exports.testInterpretedAddDict = function(test) {
	checkInterpretedOutput(test, "add/addDict.poc");
};

exports.testTranspiledAddDict = function(test) {
	checkTranspiledOutput(test, "add/addDict.poc");
};

exports.testInterpretedAddInteger = function(test) {
	checkInterpretedOutput(test, "add/addInteger.poc");
};

exports.testTranspiledAddInteger = function(test) {
	checkTranspiledOutput(test, "add/addInteger.poc");
};

exports.testInterpretedAddList = function(test) {
	checkInterpretedOutput(test, "add/addList.poc");
};

exports.testTranspiledAddList = function(test) {
	checkTranspiledOutput(test, "add/addList.poc");
};

exports.testInterpretedAddPeriod = function(test) {
	checkInterpretedOutput(test, "add/addPeriod.poc");
};

exports.testTranspiledAddPeriod = function(test) {
	checkTranspiledOutput(test, "add/addPeriod.poc");
};

exports.testInterpretedAddSet = function(test) {
	checkInterpretedOutput(test, "add/addSet.poc");
};

exports.testTranspiledAddSet = function(test) {
	checkTranspiledOutput(test, "add/addSet.poc");
};

exports.testInterpretedAddTextCharacter = function(test) {
	checkInterpretedOutput(test, "add/addTextCharacter.poc");
};

exports.testTranspiledAddTextCharacter = function(test) {
	checkTranspiledOutput(test, "add/addTextCharacter.poc");
};

exports.testInterpretedAddTextDecimal = function(test) {
	checkInterpretedOutput(test, "add/addTextDecimal.poc");
};

exports.testTranspiledAddTextDecimal = function(test) {
	checkTranspiledOutput(test, "add/addTextDecimal.poc");
};

exports.testInterpretedAddTextInteger = function(test) {
	checkInterpretedOutput(test, "add/addTextInteger.poc");
};

exports.testTranspiledAddTextInteger = function(test) {
	checkTranspiledOutput(test, "add/addTextInteger.poc");
};

exports.testInterpretedAddTextText = function(test) {
	checkInterpretedOutput(test, "add/addTextText.poc");
};

exports.testTranspiledAddTextText = function(test) {
	checkTranspiledOutput(test, "add/addTextText.poc");
};

exports.testInterpretedAddTime = function(test) {
	checkInterpretedOutput(test, "add/addTime.poc");
};

exports.testTranspiledAddTime = function(test) {
	checkTranspiledOutput(test, "add/addTime.poc");
};

exports.testInterpretedAddTuple = function(test) {
	checkInterpretedOutput(test, "add/addTuple.poc");
};

exports.testTranspiledAddTuple = function(test) {
	checkTranspiledOutput(test, "add/addTuple.poc");
};

