require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testItemDict = function(test) {
	compareResourceOMO(test, "item/itemDict.poc");
};

exports.testItemList = function(test) {
	compareResourceOMO(test, "item/itemList.poc");
};

exports.testItemRange = function(test) {
	compareResourceOMO(test, "item/itemRange.poc");
};

exports.testItemSet = function(test) {
	compareResourceOMO(test, "item/itemSet.poc");
};

exports.testItemText = function(test) {
	compareResourceOMO(test, "item/itemText.poc");
};

