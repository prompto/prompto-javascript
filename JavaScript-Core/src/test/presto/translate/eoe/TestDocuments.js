require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDeepItem = function(test) {
	compareResourceEOE(test, "documents/deepItem.e");
};

exports.testDeepVariable = function(test) {
	compareResourceEOE(test, "documents/deepVariable.e");
};

exports.testItem = function(test) {
	compareResourceEOE(test, "documents/item.e");
};

exports.testVariable = function(test) {
	compareResourceEOE(test, "documents/variable.e");
};

