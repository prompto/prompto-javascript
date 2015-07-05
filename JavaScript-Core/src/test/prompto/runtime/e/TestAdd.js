// generated: 2015-07-05T23:01:01.984
require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAddCharacter = function(test) {
	checkOutput(test, "add/addCharacter.pec");
};

exports.testAddDate = function(test) {
	checkOutput(test, "add/addDate.pec");
};

exports.testAddDateTime = function(test) {
	checkOutput(test, "add/addDateTime.pec");
};

exports.testAddDecimal = function(test) {
	checkOutput(test, "add/addDecimal.pec");
};

exports.testAddDict = function(test) {
	checkOutput(test, "add/addDict.pec");
};

exports.testAddInteger = function(test) {
	checkOutput(test, "add/addInteger.pec");
};

exports.testAddList = function(test) {
	checkOutput(test, "add/addList.pec");
};

exports.testAddPeriod = function(test) {
	checkOutput(test, "add/addPeriod.pec");
};

exports.testAddSet = function(test) {
	checkOutput(test, "add/addSet.pec");
};

exports.testAddText = function(test) {
	checkOutput(test, "add/addText.pec");
};

exports.testAddTime = function(test) {
	checkOutput(test, "add/addTime.pec");
};

exports.testAddTuple = function(test) {
	checkOutput(test, "add/addTuple.pec");
};

