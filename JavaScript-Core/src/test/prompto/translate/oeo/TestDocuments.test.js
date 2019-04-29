require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDeepItem = function(test) {
	compareResourceOEO(test, "documents/deepItem.poc");
};

exports.testDeepMember = function(test) {
	compareResourceOEO(test, "documents/deepMember.poc");
};

exports.testItem = function(test) {
	compareResourceOEO(test, "documents/item.poc");
};

exports.testLiteral = function(test) {
	compareResourceOEO(test, "documents/literal.poc");
};

exports.testMember = function(test) {
	compareResourceOEO(test, "documents/member.poc");
};

