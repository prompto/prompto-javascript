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

exports.testAddDecimalEnum = function(test) {
	compareResourceESE(test, "add/addDecimalEnum.pec");
};

exports.testAddDict = function(test) {
	compareResourceESE(test, "add/addDict.pec");
};

exports.testAddInteger = function(test) {
	compareResourceESE(test, "add/addInteger.pec");
};

exports.testAddIntegerEnum = function(test) {
	compareResourceESE(test, "add/addIntegerEnum.pec");
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

exports.testAddTextCharacter = function(test) {
	compareResourceESE(test, "add/addTextCharacter.pec");
};

exports.testAddTextDecimal = function(test) {
	compareResourceESE(test, "add/addTextDecimal.pec");
};

exports.testAddTextEnum = function(test) {
	compareResourceESE(test, "add/addTextEnum.pec");
};

exports.testAddTextInteger = function(test) {
	compareResourceESE(test, "add/addTextInteger.pec");
};

exports.testAddTextText = function(test) {
	compareResourceESE(test, "add/addTextText.pec");
};

exports.testAddTime = function(test) {
	compareResourceESE(test, "add/addTime.pec");
};

exports.testAddTuple = function(test) {
	compareResourceESE(test, "add/addTuple.pec");
};

