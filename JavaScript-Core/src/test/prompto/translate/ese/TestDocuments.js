require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testBlob = function(test) {
	compareResourceESE(test, "documents/blob.pec");
};

exports.testDeepItem = function(test) {
	compareResourceESE(test, "documents/deepItem.pec");
};

exports.testDeepVariable = function(test) {
	compareResourceESE(test, "documents/deepVariable.pec");
};

exports.testItem = function(test) {
	compareResourceESE(test, "documents/item.pec");
};

exports.testVariable = function(test) {
	compareResourceESE(test, "documents/variable.pec");
};

