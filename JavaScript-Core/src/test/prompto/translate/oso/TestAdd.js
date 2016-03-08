require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAddCharacter = function(test) {
	compareResourceOSO(test, "add/addCharacter.poc");
};

exports.testAddDate = function(test) {
	compareResourceOSO(test, "add/addDate.poc");
};

exports.testAddDateTime = function(test) {
	compareResourceOSO(test, "add/addDateTime.poc");
};

exports.testAddDecimal = function(test) {
	compareResourceOSO(test, "add/addDecimal.poc");
};

exports.testAddDict = function(test) {
	compareResourceOSO(test, "add/addDict.poc");
};

exports.testAddInteger = function(test) {
	compareResourceOSO(test, "add/addInteger.poc");
};

exports.testAddList = function(test) {
	compareResourceOSO(test, "add/addList.poc");
};

exports.testAddPeriod = function(test) {
	compareResourceOSO(test, "add/addPeriod.poc");
};

exports.testAddSet = function(test) {
	compareResourceOSO(test, "add/addSet.poc");
};

exports.testAddTextDecimal = function(test) {
	compareResourceOSO(test, "add/addTextDecimal.poc");
};

exports.testAddTextInteger = function(test) {
	compareResourceOSO(test, "add/addTextInteger.poc");
};

exports.testAddTextText = function(test) {
	compareResourceOSO(test, "add/addTextText.poc");
};

exports.testAddTime = function(test) {
	compareResourceOSO(test, "add/addTime.poc");
};

exports.testAddTuple = function(test) {
	compareResourceOSO(test, "add/addTuple.poc");
};

