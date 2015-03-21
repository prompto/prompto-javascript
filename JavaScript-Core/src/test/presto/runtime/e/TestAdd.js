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
	checkOutput(test, "add/addCharacter.e");
};

exports.testAddDate = function(test) {
	checkOutput(test, "add/addDate.e");
};

exports.testAddDateTime = function(test) {
	checkOutput(test, "add/addDateTime.e");
};

exports.testAddDecimal = function(test) {
	checkOutput(test, "add/addDecimal.e");
};

exports.testAddDict = function(test) {
	checkOutput(test, "add/addDict.e");
};

exports.testAddInteger = function(test) {
	checkOutput(test, "add/addInteger.e");
};

exports.testAddList = function(test) {
	checkOutput(test, "add/addList.e");
};

exports.testAddPeriod = function(test) {
	checkOutput(test, "add/addPeriod.e");
};

exports.testAddSet = function(test) {
	checkOutput(test, "add/addSet.e");
};

exports.testAddText = function(test) {
	checkOutput(test, "add/addText.e");
};

exports.testAddTime = function(test) {
	checkOutput(test, "add/addTime.e");
};

exports.testAddTuple = function(test) {
	checkOutput(test, "add/addTuple.e");
};

