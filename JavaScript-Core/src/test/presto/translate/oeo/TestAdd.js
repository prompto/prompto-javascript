require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAddCharacter = function(test) {
	compareResourceOEO(test, "add/addCharacter.o");
};

exports.testAddDate = function(test) {
	compareResourceOEO(test, "add/addDate.o");
};

exports.testAddDateTime = function(test) {
	compareResourceOEO(test, "add/addDateTime.o");
};

exports.testAddDecimal = function(test) {
	compareResourceOEO(test, "add/addDecimal.o");
};

exports.testAddDict = function(test) {
	compareResourceOEO(test, "add/addDict.o");
};

exports.testAddInteger = function(test) {
	compareResourceOEO(test, "add/addInteger.o");
};

exports.testAddList = function(test) {
	compareResourceOEO(test, "add/addList.o");
};

exports.testAddPeriod = function(test) {
	compareResourceOEO(test, "add/addPeriod.o");
};

exports.testAddSet = function(test) {
	compareResourceOEO(test, "add/addSet.o");
};

exports.testAddText = function(test) {
	compareResourceOEO(test, "add/addText.o");
};

exports.testAddTime = function(test) {
	compareResourceOEO(test, "add/addTime.o");
};

exports.testAddTuple = function(test) {
	compareResourceOEO(test, "add/addTuple.o");
};

