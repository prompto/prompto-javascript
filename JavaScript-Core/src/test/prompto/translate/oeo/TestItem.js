// generated: 2015-07-05T23:01:02.090
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testItemDict = function(test) {
	compareResourceOEO(test, "item/itemDict.poc");
};

exports.testItemList = function(test) {
	compareResourceOEO(test, "item/itemList.poc");
};

exports.testItemRange = function(test) {
	compareResourceOEO(test, "item/itemRange.poc");
};

exports.testItemSet = function(test) {
	compareResourceOEO(test, "item/itemSet.poc");
};

exports.testItemText = function(test) {
	compareResourceOEO(test, "item/itemText.poc");
};

