require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testAddCharacter = function(test) {
	compareResourceOPO(test, "add/addCharacter.o");
};

exports.testAddDate = function(test) {
	compareResourceOPO(test, "add/addDate.o");
};

exports.testAddDateTime = function(test) {
	compareResourceOPO(test, "add/addDateTime.o");
};

exports.testAddDecimal = function(test) {
	compareResourceOPO(test, "add/addDecimal.o");
};

exports.testAddDict = function(test) {
	compareResourceOPO(test, "add/addDict.o");
};

exports.testAddInteger = function(test) {
	compareResourceOPO(test, "add/addInteger.o");
};

exports.testAddList = function(test) {
	compareResourceOPO(test, "add/addList.o");
};

exports.testAddPeriod = function(test) {
	compareResourceOPO(test, "add/addPeriod.o");
};

exports.testAddSet = function(test) {
	compareResourceOPO(test, "add/addSet.o");
};

exports.testAddText = function(test) {
	compareResourceOPO(test, "add/addText.o");
};

exports.testAddTime = function(test) {
	compareResourceOPO(test, "add/addTime.o");
};

exports.testAddTuple = function(test) {
	compareResourceOPO(test, "add/addTuple.o");
};

