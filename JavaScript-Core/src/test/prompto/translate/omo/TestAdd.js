require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testAddCharacter = function(test) {
	compareResourceOMO(test, "add/addCharacter.poc");
};

exports.testAddDate = function(test) {
	compareResourceOMO(test, "add/addDate.poc");
};

exports.testAddDateTime = function(test) {
	compareResourceOMO(test, "add/addDateTime.poc");
};

exports.testAddDecimal = function(test) {
	compareResourceOMO(test, "add/addDecimal.poc");
};

exports.testAddDict = function(test) {
	compareResourceOMO(test, "add/addDict.poc");
};

exports.testAddInteger = function(test) {
	compareResourceOMO(test, "add/addInteger.poc");
};

exports.testAddList = function(test) {
	compareResourceOMO(test, "add/addList.poc");
};

exports.testAddPeriod = function(test) {
	compareResourceOMO(test, "add/addPeriod.poc");
};

exports.testAddSet = function(test) {
	compareResourceOMO(test, "add/addSet.poc");
};

exports.testAddTextCharacter = function(test) {
	compareResourceOMO(test, "add/addTextCharacter.poc");
};

exports.testAddTextDecimal = function(test) {
	compareResourceOMO(test, "add/addTextDecimal.poc");
};

exports.testAddTextInteger = function(test) {
	compareResourceOMO(test, "add/addTextInteger.poc");
};

exports.testAddTextText = function(test) {
	compareResourceOMO(test, "add/addTextText.poc");
};

exports.testAddTime = function(test) {
	compareResourceOMO(test, "add/addTime.poc");
};

exports.testAddTuple = function(test) {
	compareResourceOMO(test, "add/addTuple.poc");
};

