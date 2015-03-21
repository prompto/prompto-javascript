require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testDeepItem = function(test) {
	compareResourceOPO(test, "documents/deepItem.o");
};

exports.testDeepVariable = function(test) {
	compareResourceOPO(test, "documents/deepVariable.o");
};

exports.testItem = function(test) {
	compareResourceOPO(test, "documents/item.o");
};

exports.testVariable = function(test) {
	compareResourceOPO(test, "documents/variable.o");
};

