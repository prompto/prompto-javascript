require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testDeepItem = function(test) {
	compareResourceEPE(test, "documents/deepItem.e");
};

exports.testDeepVariable = function(test) {
	compareResourceEPE(test, "documents/deepVariable.e");
};

exports.testItem = function(test) {
	compareResourceEPE(test, "documents/item.e");
};

exports.testVariable = function(test) {
	compareResourceEPE(test, "documents/variable.e");
};

