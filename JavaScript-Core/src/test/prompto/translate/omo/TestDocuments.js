require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testDeepItem = function(test) {
	compareResourceOMO(test, "documents/deepItem.poc");
};

exports.testDeepMember = function(test) {
	compareResourceOMO(test, "documents/deepMember.poc");
};

exports.testItem = function(test) {
	compareResourceOMO(test, "documents/item.poc");
};

exports.testLiteral = function(test) {
	compareResourceOMO(test, "documents/literal.poc");
};

exports.testMember = function(test) {
	compareResourceOMO(test, "documents/member.poc");
};

