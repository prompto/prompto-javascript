require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testMemberAttribute = function(test) {
	compareResourceEME(test, "member/memberAttribute.pec");
};

