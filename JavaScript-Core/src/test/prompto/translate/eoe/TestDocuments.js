// generated: 2015-07-05T23:01:02.034
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDeepItem = function(test) {
	compareResourceEOE(test, "documents/deepItem.pec");
};

exports.testDeepVariable = function(test) {
	compareResourceEOE(test, "documents/deepVariable.pec");
};

exports.testItem = function(test) {
	compareResourceEOE(test, "documents/item.pec");
};

exports.testVariable = function(test) {
	compareResourceEOE(test, "documents/variable.pec");
};
