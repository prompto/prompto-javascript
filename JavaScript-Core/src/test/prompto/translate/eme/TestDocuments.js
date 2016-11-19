require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testBlob = function(test) {
	compareResourceEME(test, "documents/blob.pec");
};

exports.testDeepItem = function(test) {
	compareResourceEME(test, "documents/deepItem.pec");
};

exports.testDeepVariable = function(test) {
	compareResourceEME(test, "documents/deepVariable.pec");
};

exports.testItem = function(test) {
	compareResourceEME(test, "documents/item.pec");
};

exports.testNamedItem = function(test) {
	compareResourceEME(test, "documents/namedItem.pec");
};

exports.testVariable = function(test) {
	compareResourceEME(test, "documents/variable.pec");
};

