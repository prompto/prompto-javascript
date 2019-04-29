require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAttribute = function(test) {
	compareResourceEME(test, "singleton/attribute.pec");
};

exports.testMember = function(test) {
	compareResourceEME(test, "singleton/member.pec");
};

