require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testMemberAttribute = function(test) {
	compareResourceOMO(test, "member/memberAttribute.poc");
};

