// generated: 2015-07-05T23:01:02.166
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSelfAsParameter = function(test) {
	compareResourceEOE(test, "self/selfAsParameter.pec");
};

exports.testSelfMember = function(test) {
	compareResourceEOE(test, "self/selfMember.pec");
};

