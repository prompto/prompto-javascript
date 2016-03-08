require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAddCharacter = function(test) {
	compareResourceOEO(test, "add/addCharacter.poc");
};

exports.testAddDate = function(test) {
	compareResourceOEO(test, "add/addDate.poc");
};

exports.testAddDateTime = function(test) {
	compareResourceOEO(test, "add/addDateTime.poc");
};

exports.testAddDecimal = function(test) {
	compareResourceOEO(test, "add/addDecimal.poc");
};

exports.testAddDict = function(test) {
	compareResourceOEO(test, "add/addDict.poc");
};

exports.testAddInteger = function(test) {
	compareResourceOEO(test, "add/addInteger.poc");
};

exports.testAddList = function(test) {
	compareResourceOEO(test, "add/addList.poc");
};

exports.testAddPeriod = function(test) {
	compareResourceOEO(test, "add/addPeriod.poc");
};

exports.testAddSet = function(test) {
	compareResourceOEO(test, "add/addSet.poc");
};

exports.testAddTextDecimal = function(test) {
	compareResourceOEO(test, "add/addTextDecimal.poc");
};

exports.testAddTextInteger = function(test) {
	compareResourceOEO(test, "add/addTextInteger.poc");
};

exports.testAddTextText = function(test) {
	compareResourceOEO(test, "add/addTextText.poc");
};

exports.testAddTime = function(test) {
	compareResourceOEO(test, "add/addTime.poc");
};

exports.testAddTuple = function(test) {
	compareResourceOEO(test, "add/addTuple.poc");
};

