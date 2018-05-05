require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedItemDict = function(test) {
	checkInterpretedOutput(test, "item/itemDict.poc");
};

exports.testTranspiledItemDict = function(test) {
	checkTranspiledOutput(test, "item/itemDict.poc");
};

exports.testInterpretedItemList = function(test) {
	checkInterpretedOutput(test, "item/itemList.poc");
};

exports.testTranspiledItemList = function(test) {
	checkTranspiledOutput(test, "item/itemList.poc");
};

exports.testInterpretedItemRange = function(test) {
	checkInterpretedOutput(test, "item/itemRange.poc");
};

exports.testTranspiledItemRange = function(test) {
	checkTranspiledOutput(test, "item/itemRange.poc");
};

exports.testInterpretedItemSet = function(test) {
	checkInterpretedOutput(test, "item/itemSet.poc");
};

exports.testTranspiledItemSet = function(test) {
	checkTranspiledOutput(test, "item/itemSet.poc");
};

exports.testInterpretedItemText = function(test) {
	checkInterpretedOutput(test, "item/itemText.poc");
};

exports.testTranspiledItemText = function(test) {
	checkTranspiledOutput(test, "item/itemText.poc");
};

