require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testSelfAsParameter = function(test) {
	compareResourceEME(test, "self/selfAsParameter.pec");
};

exports.testSelfMember = function(test) {
	compareResourceEME(test, "self/selfMember.pec");
};

