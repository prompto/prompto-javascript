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

exports.testItemDict = function(test) {
	checkOutput(test, "item/itemDict.poc");
};

exports.testItemList = function(test) {
	checkOutput(test, "item/itemList.poc");
};

exports.testItemRange = function(test) {
	checkOutput(test, "item/itemRange.poc");
};

exports.testItemSet = function(test) {
	checkOutput(test, "item/itemSet.poc");
};

exports.testItemText = function(test) {
	checkOutput(test, "item/itemText.poc");
};

