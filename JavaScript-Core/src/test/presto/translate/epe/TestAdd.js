require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testAddCharacter = function(test) {
	compareResourceEPE(test, "add/addCharacter.e");
};

exports.testAddDate = function(test) {
	compareResourceEPE(test, "add/addDate.e");
};

exports.testAddDateTime = function(test) {
	compareResourceEPE(test, "add/addDateTime.e");
};

exports.testAddDecimal = function(test) {
	compareResourceEPE(test, "add/addDecimal.e");
};

exports.testAddDict = function(test) {
	compareResourceEPE(test, "add/addDict.e");
};

exports.testAddInteger = function(test) {
	compareResourceEPE(test, "add/addInteger.e");
};

exports.testAddList = function(test) {
	compareResourceEPE(test, "add/addList.e");
};

exports.testAddPeriod = function(test) {
	compareResourceEPE(test, "add/addPeriod.e");
};

exports.testAddSet = function(test) {
	compareResourceEPE(test, "add/addSet.e");
};

exports.testAddText = function(test) {
	compareResourceEPE(test, "add/addText.e");
};

exports.testAddTime = function(test) {
	compareResourceEPE(test, "add/addTime.e");
};

exports.testAddTuple = function(test) {
	compareResourceEPE(test, "add/addTuple.e");
};

