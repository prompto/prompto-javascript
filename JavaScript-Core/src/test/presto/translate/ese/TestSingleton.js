require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAttribute = function(test) {
	compareResourceESE(test, "singleton/attribute.pec");
};

exports.testMember = function(test) {
	compareResourceESE(test, "singleton/member.pec");
};

