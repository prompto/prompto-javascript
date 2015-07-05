// generated: 2015-07-05T23:01:02.035
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

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

