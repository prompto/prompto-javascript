require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testItemDict = function(test) {
	compareResourceEOE(test, "item/itemDict.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testItemList = function(test) {
	compareResourceEOE(test, "item/itemList.pec");
};

exports.testItemRange = function(test) {
	compareResourceEOE(test, "item/itemRange.pec");
};

exports.testItemSet = function(test) {
	compareResourceEOE(test, "item/itemSet.pec");
};

exports.testItemText = function(test) {
	compareResourceEOE(test, "item/itemText.pec");
};

