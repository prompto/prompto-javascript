require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testAttribute = function(test) {
	compareResourceOMO(test, "singleton/attribute.poc");
};

exports.testMember = function(test) {
	compareResourceOMO(test, "singleton/member.poc");
};

