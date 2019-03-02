require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMemberAttribute = function(test) {
	compareResourceOEO(test, "member/memberAttribute.poc");
};

