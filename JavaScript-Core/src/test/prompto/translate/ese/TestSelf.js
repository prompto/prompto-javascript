require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testSelfAsParameter = function(test) {
	compareResourceESE(test, "self/selfAsParameter.pec");
};

exports.testSelfMember = function(test) {
	compareResourceESE(test, "self/selfMember.pec");
};

