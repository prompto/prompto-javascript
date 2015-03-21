require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testItemDict = function(test) {
	compareResourceOPO(test, "item/itemDict.o");
};

exports.testItemList = function(test) {
	compareResourceOPO(test, "item/itemList.o");
};

exports.testItemRange = function(test) {
	compareResourceOPO(test, "item/itemRange.o");
};

exports.testItemSet = function(test) {
	compareResourceOPO(test, "item/itemSet.o");
};

exports.testItemText = function(test) {
	compareResourceOPO(test, "item/itemText.o");
};

