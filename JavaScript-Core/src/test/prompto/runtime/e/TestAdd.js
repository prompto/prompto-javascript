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

exports.testAddCharacter = function(test) {
	checkOutput(test, "add/addCharacter.pec");
};

exports.testAddDate = function(test) {
	checkOutput(test, "add/addDate.pec");
};

exports.testAddDateTime = function(test) {
	checkOutput(test, "add/addDateTime.pec");
};

exports.testAddDecimal = function(test) {
	checkOutput(test, "add/addDecimal.pec");
};

exports.testAddDecimalEnum = function(test) {
	checkOutput(test, "add/addDecimalEnum.pec");
};

exports.testAddDict = function(test) {
	checkOutput(test, "add/addDict.pec");
};

exports.testAddInteger = function(test) {
	checkOutput(test, "add/addInteger.pec");
};

exports.testAddIntegerEnum = function(test) {
	checkOutput(test, "add/addIntegerEnum.pec");
};

exports.testAddList = function(test) {
	checkOutput(test, "add/addList.pec");
};

exports.testAddPeriod = function(test) {
	checkOutput(test, "add/addPeriod.pec");
};

exports.testAddSet = function(test) {
	checkOutput(test, "add/addSet.pec");
};

exports.testAddTextCharacter = function(test) {
	checkOutput(test, "add/addTextCharacter.pec");
};

exports.testAddTextDecimal = function(test) {
	checkOutput(test, "add/addTextDecimal.pec");
};

exports.testAddTextEnum = function(test) {
	checkOutput(test, "add/addTextEnum.pec");
};

exports.testAddTextInteger = function(test) {
	checkOutput(test, "add/addTextInteger.pec");
};

exports.testAddTextText = function(test) {
	checkOutput(test, "add/addTextText.pec");
};

exports.testAddTime = function(test) {
	checkOutput(test, "add/addTime.pec");
};

exports.testAddTuple = function(test) {
	checkOutput(test, "add/addTuple.pec");
};

