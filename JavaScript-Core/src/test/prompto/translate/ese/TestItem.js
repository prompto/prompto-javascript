require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testItemDict = function(test) {
	compareResourceESE(test, "item/itemDict.pec");
};

exports.testItemList = function(test) {
	compareResourceESE(test, "item/itemList.pec");
};

exports.testItemRange = function(test) {
	compareResourceESE(test, "item/itemRange.pec");
};

exports.testItemSet = function(test) {
	compareResourceESE(test, "item/itemSet.pec");
};

exports.testItemText = function(test) {
	compareResourceESE(test, "item/itemText.pec");
};

