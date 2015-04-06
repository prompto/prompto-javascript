require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testItemDict = function(test) {
	compareResourceOSO(test, "item/itemDict.poc");
};

exports.testItemList = function(test) {
	compareResourceOSO(test, "item/itemList.poc");
};

exports.testItemRange = function(test) {
	compareResourceOSO(test, "item/itemRange.poc");
};

exports.testItemSet = function(test) {
	compareResourceOSO(test, "item/itemSet.poc");
};

exports.testItemText = function(test) {
	compareResourceOSO(test, "item/itemText.poc");
};

