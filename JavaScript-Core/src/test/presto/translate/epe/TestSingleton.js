require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testAttribute = function(test) {
	compareResourceEPE(test, "singleton/attribute.e");
};

exports.testMember = function(test) {
	compareResourceEPE(test, "singleton/member.e");
};

