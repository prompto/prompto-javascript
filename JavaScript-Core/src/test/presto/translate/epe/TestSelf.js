require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testSelfAsParameter = function(test) {
	compareResourceEPE(test, "self/selfAsParameter.e");
};

exports.testSelfMember = function(test) {
	compareResourceEPE(test, "self/selfMember.e");
};

