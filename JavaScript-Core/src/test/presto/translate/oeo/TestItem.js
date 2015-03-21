require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testItemDict = function(test) {
	compareResourceOEO(test, "item/itemDict.o");
};

exports.testItemList = function(test) {
	compareResourceOEO(test, "item/itemList.o");
};

exports.testItemRange = function(test) {
	compareResourceOEO(test, "item/itemRange.o");
};

exports.testItemSet = function(test) {
	compareResourceOEO(test, "item/itemSet.o");
};

exports.testItemText = function(test) {
	compareResourceOEO(test, "item/itemText.o");
};

