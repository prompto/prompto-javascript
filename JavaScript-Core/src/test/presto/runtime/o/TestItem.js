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
	checkOutput(test, "item/itemDict.o");
};

exports.testItemList = function(test) {
	checkOutput(test, "item/itemList.o");
};

exports.testItemRange = function(test) {
	checkOutput(test, "item/itemRange.o");
};

exports.testItemSet = function(test) {
	checkOutput(test, "item/itemSet.o");
};

exports.testItemText = function(test) {
	checkOutput(test, "item/itemText.o");
};

