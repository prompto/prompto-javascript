// generated: 2015-07-05T23:01:02.037
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDeepItem = function(test) {
	compareResourceOEO(test, "documents/deepItem.poc");
};

exports.testDeepVariable = function(test) {
	compareResourceOEO(test, "documents/deepVariable.poc");
};

exports.testItem = function(test) {
	compareResourceOEO(test, "documents/item.poc");
};

exports.testVariable = function(test) {
	compareResourceOEO(test, "documents/variable.poc");
};

