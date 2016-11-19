require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testDeepItem = function(test) {
	compareResourceOMO(test, "documents/deepItem.poc");
};

exports.testDeepVariable = function(test) {
	compareResourceOMO(test, "documents/deepVariable.poc");
};

exports.testItem = function(test) {
	compareResourceOMO(test, "documents/item.poc");
};

exports.testVariable = function(test) {
	compareResourceOMO(test, "documents/variable.poc");
};

