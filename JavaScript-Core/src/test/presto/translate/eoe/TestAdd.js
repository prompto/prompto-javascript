require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAddCharacter = function(test) {
	compareResourceEOE(test, "add/addCharacter.e");
};

exports.testAddDate = function(test) {
	compareResourceEOE(test, "add/addDate.e");
};

exports.testAddDateTime = function(test) {
	compareResourceEOE(test, "add/addDateTime.e");
};

exports.testAddDecimal = function(test) {
	compareResourceEOE(test, "add/addDecimal.e");
};

exports.testAddDict = function(test) {
	compareResourceEOE(test, "add/addDict.e");
};

exports.testAddInteger = function(test) {
	compareResourceEOE(test, "add/addInteger.e");
};

exports.testAddList = function(test) {
	compareResourceEOE(test, "add/addList.e");
};

exports.testAddPeriod = function(test) {
	compareResourceEOE(test, "add/addPeriod.e");
};

exports.testAddSet = function(test) {
	compareResourceEOE(test, "add/addSet.e");
};

exports.testAddText = function(test) {
	compareResourceEOE(test, "add/addText.e");
};

exports.testAddTime = function(test) {
	compareResourceEOE(test, "add/addTime.e");
};

exports.testAddTuple = function(test) {
	compareResourceEOE(test, "add/addTuple.e");
};

