require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testItemDict = function(test) {
	compareResourceEME(test, "item/itemDict.pec");
};

exports.testItemList = function(test) {
	compareResourceEME(test, "item/itemList.pec");
};

exports.testItemRange = function(test) {
	compareResourceEME(test, "item/itemRange.pec");
};

exports.testItemSet = function(test) {
	compareResourceEME(test, "item/itemSet.pec");
};

exports.testItemText = function(test) {
	compareResourceEME(test, "item/itemText.pec");
};

