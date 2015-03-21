require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAddCharacter = function(test) {
	checkOutput(test, "add/addCharacter.o");
};

exports.testAddDate = function(test) {
	checkOutput(test, "add/addDate.o");
};

exports.testAddDateTime = function(test) {
	checkOutput(test, "add/addDateTime.o");
};

exports.testAddDecimal = function(test) {
	checkOutput(test, "add/addDecimal.o");
};

exports.testAddDict = function(test) {
	checkOutput(test, "add/addDict.o");
};

exports.testAddInteger = function(test) {
	checkOutput(test, "add/addInteger.o");
};

exports.testAddList = function(test) {
	checkOutput(test, "add/addList.o");
};

exports.testAddPeriod = function(test) {
	checkOutput(test, "add/addPeriod.o");
};

exports.testAddSet = function(test) {
	checkOutput(test, "add/addSet.o");
};

exports.testAddText = function(test) {
	checkOutput(test, "add/addText.o");
};

exports.testAddTime = function(test) {
	checkOutput(test, "add/addTime.o");
};

exports.testAddTuple = function(test) {
	checkOutput(test, "add/addTuple.o");
};

