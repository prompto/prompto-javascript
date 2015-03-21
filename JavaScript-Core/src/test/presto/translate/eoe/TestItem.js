require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testItemDict = function(test) {
	compareResourceEOE(test, "item/itemDict.e");
};

exports.testItemList = function(test) {
	compareResourceEOE(test, "item/itemList.e");
};

exports.testItemRange = function(test) {
	compareResourceEOE(test, "item/itemRange.e");
};

exports.testItemSet = function(test) {
	compareResourceEOE(test, "item/itemSet.e");
};

exports.testItemText = function(test) {
	compareResourceEOE(test, "item/itemText.e");
};

