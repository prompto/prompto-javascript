require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testItemDict = function(test) {
	compareResourceEPE(test, "item/itemDict.e");
};

exports.testItemList = function(test) {
	compareResourceEPE(test, "item/itemList.e");
};

exports.testItemRange = function(test) {
	compareResourceEPE(test, "item/itemRange.e");
};

exports.testItemSet = function(test) {
	compareResourceEPE(test, "item/itemSet.e");
};

exports.testItemText = function(test) {
	compareResourceEPE(test, "item/itemText.e");
};

