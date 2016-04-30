require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testBlob = function(test) {
	compareResourceEOE(test, "documents/blob.pec");
};

exports.testDeepItem = function(test) {
	compareResourceEOE(test, "documents/deepItem.pec");
};

exports.testDeepVariable = function(test) {
	compareResourceEOE(test, "documents/deepVariable.pec");
};

exports.testItem = function(test) {
	compareResourceEOE(test, "documents/item.pec");
};

exports.testNamedItem = function(test) {
	compareResourceEOE(test, "documents/namedItem.pec");
};

exports.testVariable = function(test) {
	compareResourceEOE(test, "documents/variable.pec");
};

