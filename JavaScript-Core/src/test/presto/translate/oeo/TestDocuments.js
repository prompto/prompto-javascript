require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDeepItem = function(test) {
	compareResourceOEO(test, "documents/deepItem.o");
};

exports.testDeepVariable = function(test) {
	compareResourceOEO(test, "documents/deepVariable.o");
};

exports.testItem = function(test) {
	compareResourceOEO(test, "documents/item.o");
};

exports.testVariable = function(test) {
	compareResourceOEO(test, "documents/variable.o");
};

