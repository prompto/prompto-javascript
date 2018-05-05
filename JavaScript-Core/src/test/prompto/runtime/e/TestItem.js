require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedItemDict = function(test) {
	checkInterpretedOutput(test, "item/itemDict.pec");
};

exports.testTranspiledItemDict = function(test) {
	checkTranspiledOutput(test, "item/itemDict.pec");
};

exports.testInterpretedItemList = function(test) {
	checkInterpretedOutput(test, "item/itemList.pec");
};

exports.testTranspiledItemList = function(test) {
	checkTranspiledOutput(test, "item/itemList.pec");
};

exports.testInterpretedItemRange = function(test) {
	checkInterpretedOutput(test, "item/itemRange.pec");
};

exports.testTranspiledItemRange = function(test) {
	checkTranspiledOutput(test, "item/itemRange.pec");
};

exports.testInterpretedItemSet = function(test) {
	checkInterpretedOutput(test, "item/itemSet.pec");
};

exports.testTranspiledItemSet = function(test) {
	checkTranspiledOutput(test, "item/itemSet.pec");
};

exports.testInterpretedItemText = function(test) {
	checkInterpretedOutput(test, "item/itemText.pec");
};

exports.testTranspiledItemText = function(test) {
	checkTranspiledOutput(test, "item/itemText.pec");
};

