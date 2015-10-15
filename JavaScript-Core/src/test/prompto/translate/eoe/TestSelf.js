require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSelfAsParameter = function(test) {
	compareResourceEOE(test, "self/selfAsParameter.pec");
};

exports.testSelfMember = function(test) {
	compareResourceEOE(test, "self/selfMember.pec");
};

