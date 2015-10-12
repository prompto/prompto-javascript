require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testDeepItem = function(test) {
	compareResourceOSO(test, "documents/deepItem.poc");
};

exports.testDeepVariable = function(test) {
	compareResourceOSO(test, "documents/deepVariable.poc");
};

exports.testItem = function(test) {
	compareResourceOSO(test, "documents/item.poc");
};

exports.testVariable = function(test) {
	compareResourceOSO(test, "documents/variable.poc");
};

