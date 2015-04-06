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
	checkOutput(test, "item/itemDict.pec");
};

exports.testItemList = function(test) {
	checkOutput(test, "item/itemList.pec");
};

exports.testItemRange = function(test) {
	checkOutput(test, "item/itemRange.pec");
};

exports.testItemSet = function(test) {
	checkOutput(test, "item/itemSet.pec");
};

exports.testItemText = function(test) {
	checkOutput(test, "item/itemText.pec");
};

