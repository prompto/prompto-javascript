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

exports.testItemDict = function(test) {
	checkOutput(test, "item/itemDict.e");
};

exports.testItemList = function(test) {
	checkOutput(test, "item/itemList.e");
};

exports.testItemRange = function(test) {
	checkOutput(test, "item/itemRange.e");
};

exports.testItemSet = function(test) {
	checkOutput(test, "item/itemSet.e");
};

exports.testItemText = function(test) {
	checkOutput(test, "item/itemText.e");
};

