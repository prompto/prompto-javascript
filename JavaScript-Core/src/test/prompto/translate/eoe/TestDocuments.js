require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDeepItem = function(test) {
	compareResourceEOE(test, "documents/deepItem.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testDeepVariable = function(test) {
	compareResourceEOE(test, "documents/deepVariable.pec");
};

exports.testItem = function(test) {
	compareResourceEOE(test, "documents/item.pec");
};

exports.testVariable = function(test) {
	compareResourceEOE(test, "documents/variable.pec");
};

