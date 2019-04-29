require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMemberAttribute = function(test) {
	compareResourceEOE(test, "member/memberAttribute.pec");
};

