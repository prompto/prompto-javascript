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
	checkOutput(test, "add/addCharacter.poc");
};

exports.testAddDate = function(test) {
	checkOutput(test, "add/addDate.poc");
};

exports.testAddDateTime = function(test) {
	checkOutput(test, "add/addDateTime.poc");
};

exports.testAddDecimal = function(test) {
	checkOutput(test, "add/addDecimal.poc");
};

exports.testAddDict = function(test) {
	checkOutput(test, "add/addDict.poc");
};

exports.testAddInteger = function(test) {
	checkOutput(test, "add/addInteger.poc");
};

exports.testAddList = function(test) {
	checkOutput(test, "add/addList.poc");
};

exports.testAddPeriod = function(test) {
	checkOutput(test, "add/addPeriod.poc");
};

exports.testAddSet = function(test) {
	checkOutput(test, "add/addSet.poc");
};

exports.testAddTextDecimal = function(test) {
	checkOutput(test, "add/addTextDecimal.poc");
};

exports.testAddTextInteger = function(test) {
	checkOutput(test, "add/addTextInteger.poc");
};

exports.testAddTextText = function(test) {
	checkOutput(test, "add/addTextText.poc");
};

exports.testAddTime = function(test) {
	checkOutput(test, "add/addTime.poc");
};

exports.testAddTuple = function(test) {
	checkOutput(test, "add/addTuple.poc");
};

