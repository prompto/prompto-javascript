require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAddCharacter = function(test) {
	compareResourceESE(test, "add/addCharacter.pec");
};

exports.testAddDate = function(test) {
	compareResourceESE(test, "add/addDate.pec");
};

exports.testAddDateTime = function(test) {
	compareResourceESE(test, "add/addDateTime.pec");
};

exports.testAddDecimal = function(test) {
	compareResourceESE(test, "add/addDecimal.pec");
};

exports.testAddDict = function(test) {
	compareResourceESE(test, "add/addDict.pec");
};

exports.testAddInteger = function(test) {
	compareResourceESE(test, "add/addInteger.pec");
};

exports.testAddList = function(test) {
	compareResourceESE(test, "add/addList.pec");
};

exports.testAddPeriod = function(test) {
	compareResourceESE(test, "add/addPeriod.pec");
};

exports.testAddSet = function(test) {
	compareResourceESE(test, "add/addSet.pec");
};

exports.testAddText = function(test) {
	compareResourceESE(test, "add/addText.pec");
};

exports.testAddTime = function(test) {
	compareResourceESE(test, "add/addTime.pec");
};

exports.testAddTuple = function(test) {
	compareResourceESE(test, "add/addTuple.pec");
};

