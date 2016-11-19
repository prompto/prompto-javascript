require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAddCharacter = function(test) {
	compareResourceEME(test, "add/addCharacter.pec");
};

exports.testAddDate = function(test) {
	compareResourceEME(test, "add/addDate.pec");
};

exports.testAddDateTime = function(test) {
	compareResourceEME(test, "add/addDateTime.pec");
};

exports.testAddDecimal = function(test) {
	compareResourceEME(test, "add/addDecimal.pec");
};

exports.testAddDecimalEnum = function(test) {
	compareResourceEME(test, "add/addDecimalEnum.pec");
};

exports.testAddDict = function(test) {
	compareResourceEME(test, "add/addDict.pec");
};

exports.testAddInteger = function(test) {
	compareResourceEME(test, "add/addInteger.pec");
};

exports.testAddIntegerEnum = function(test) {
	compareResourceEME(test, "add/addIntegerEnum.pec");
};

exports.testAddList = function(test) {
	compareResourceEME(test, "add/addList.pec");
};

exports.testAddPeriod = function(test) {
	compareResourceEME(test, "add/addPeriod.pec");
};

exports.testAddSet = function(test) {
	compareResourceEME(test, "add/addSet.pec");
};

exports.testAddTextCharacter = function(test) {
	compareResourceEME(test, "add/addTextCharacter.pec");
};

exports.testAddTextDecimal = function(test) {
	compareResourceEME(test, "add/addTextDecimal.pec");
};

exports.testAddTextEnum = function(test) {
	compareResourceEME(test, "add/addTextEnum.pec");
};

exports.testAddTextInteger = function(test) {
	compareResourceEME(test, "add/addTextInteger.pec");
};

exports.testAddTextText = function(test) {
	compareResourceEME(test, "add/addTextText.pec");
};

exports.testAddTime = function(test) {
	compareResourceEME(test, "add/addTime.pec");
};

exports.testAddTuple = function(test) {
	compareResourceEME(test, "add/addTuple.pec");
};

