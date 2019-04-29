require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAddCharacter = function(test) {
	compareResourceEOE(test, "add/addCharacter.pec");
};

exports.testAddDate = function(test) {
	compareResourceEOE(test, "add/addDate.pec");
};

exports.testAddDateTime = function(test) {
	compareResourceEOE(test, "add/addDateTime.pec");
};

exports.testAddDecimal = function(test) {
	compareResourceEOE(test, "add/addDecimal.pec");
};

exports.testAddDecimalEnum = function(test) {
	compareResourceEOE(test, "add/addDecimalEnum.pec");
};

exports.testAddDict = function(test) {
	compareResourceEOE(test, "add/addDict.pec");
};

exports.testAddInteger = function(test) {
	compareResourceEOE(test, "add/addInteger.pec");
};

exports.testAddIntegerEnum = function(test) {
	compareResourceEOE(test, "add/addIntegerEnum.pec");
};

exports.testAddList = function(test) {
	compareResourceEOE(test, "add/addList.pec");
};

exports.testAddPeriod = function(test) {
	compareResourceEOE(test, "add/addPeriod.pec");
};

exports.testAddSet = function(test) {
	compareResourceEOE(test, "add/addSet.pec");
};

exports.testAddTextCharacter = function(test) {
	compareResourceEOE(test, "add/addTextCharacter.pec");
};

exports.testAddTextDecimal = function(test) {
	compareResourceEOE(test, "add/addTextDecimal.pec");
};

exports.testAddTextEnum = function(test) {
	compareResourceEOE(test, "add/addTextEnum.pec");
};

exports.testAddTextInteger = function(test) {
	compareResourceEOE(test, "add/addTextInteger.pec");
};

exports.testAddTextText = function(test) {
	compareResourceEOE(test, "add/addTextText.pec");
};

exports.testAddTime = function(test) {
	compareResourceEOE(test, "add/addTime.pec");
};

exports.testAddTuple = function(test) {
	compareResourceEOE(test, "add/addTuple.pec");
};

