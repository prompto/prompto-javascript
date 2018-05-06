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

/*
exports.testInterpretedAddCharacter = function(test) {
	checkInterpretedOutput(test, "add/addCharacter.pec");
};

exports.testTranspiledAddCharacter = function(test) {
	checkTranspiledOutput(test, "add/addCharacter.pec");
};

exports.testInterpretedAddDate = function(test) {
	checkInterpretedOutput(test, "add/addDate.pec");
};
*/
exports.testTranspiledAddDate = function(test) {
	checkTranspiledOutput(test, "add/addDate.pec");
};
/*
exports.testInterpretedAddDateTime = function(test) {
	checkInterpretedOutput(test, "add/addDateTime.pec");
};

exports.testTranspiledAddDateTime = function(test) {
	checkTranspiledOutput(test, "add/addDateTime.pec");
};

exports.testInterpretedAddDecimal = function(test) {
	checkInterpretedOutput(test, "add/addDecimal.pec");
};

exports.testTranspiledAddDecimal = function(test) {
	checkTranspiledOutput(test, "add/addDecimal.pec");
};

exports.testInterpretedAddDecimalEnum = function(test) {
	checkInterpretedOutput(test, "add/addDecimalEnum.pec");
};

exports.testTranspiledAddDecimalEnum = function(test) {
	checkTranspiledOutput(test, "add/addDecimalEnum.pec");
};

exports.testInterpretedAddDict = function(test) {
	checkInterpretedOutput(test, "add/addDict.pec");
};

exports.testTranspiledAddDict = function(test) {
	checkTranspiledOutput(test, "add/addDict.pec");
};

exports.testInterpretedAddInteger = function(test) {
	checkInterpretedOutput(test, "add/addInteger.pec");
};

exports.testTranspiledAddInteger = function(test) {
	checkTranspiledOutput(test, "add/addInteger.pec");
};

exports.testInterpretedAddIntegerEnum = function(test) {
	checkInterpretedOutput(test, "add/addIntegerEnum.pec");
};

exports.testTranspiledAddIntegerEnum = function(test) {
	checkTranspiledOutput(test, "add/addIntegerEnum.pec");
};

exports.testInterpretedAddList = function(test) {
	checkInterpretedOutput(test, "add/addList.pec");
};

exports.testTranspiledAddList = function(test) {
	checkTranspiledOutput(test, "add/addList.pec");
};

exports.testInterpretedAddPeriod = function(test) {
	checkInterpretedOutput(test, "add/addPeriod.pec");
};

exports.testTranspiledAddPeriod = function(test) {
	checkTranspiledOutput(test, "add/addPeriod.pec");
};

exports.testInterpretedAddSet = function(test) {
	checkInterpretedOutput(test, "add/addSet.pec");
};

exports.testTranspiledAddSet = function(test) {
	checkTranspiledOutput(test, "add/addSet.pec");
};

exports.testInterpretedAddTextCharacter = function(test) {
	checkInterpretedOutput(test, "add/addTextCharacter.pec");
};

exports.testTranspiledAddTextCharacter = function(test) {
	checkTranspiledOutput(test, "add/addTextCharacter.pec");
};

exports.testInterpretedAddTextDecimal = function(test) {
	checkInterpretedOutput(test, "add/addTextDecimal.pec");
};

exports.testTranspiledAddTextDecimal = function(test) {
	checkTranspiledOutput(test, "add/addTextDecimal.pec");
};

exports.testInterpretedAddTextEnum = function(test) {
	checkInterpretedOutput(test, "add/addTextEnum.pec");
};

exports.testTranspiledAddTextEnum = function(test) {
	checkTranspiledOutput(test, "add/addTextEnum.pec");
};

exports.testInterpretedAddTextInteger = function(test) {
	checkInterpretedOutput(test, "add/addTextInteger.pec");
};

exports.testTranspiledAddTextInteger = function(test) {
	checkTranspiledOutput(test, "add/addTextInteger.pec");
};

exports.testInterpretedAddTextText = function(test) {
	checkInterpretedOutput(test, "add/addTextText.pec");
};

exports.testTranspiledAddTextText = function(test) {
	checkTranspiledOutput(test, "add/addTextText.pec");
};

exports.testInterpretedAddTime = function(test) {
	checkInterpretedOutput(test, "add/addTime.pec");
};

exports.testTranspiledAddTime = function(test) {
	checkTranspiledOutput(test, "add/addTime.pec");
};

exports.testInterpretedAddTuple = function(test) {
	checkInterpretedOutput(test, "add/addTuple.pec");
};

exports.testTranspiledAddTuple = function(test) {
	checkTranspiledOutput(test, "add/addTuple.pec");
};

*/