require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSelfAsParameter = function(test) {
	compareResourceEOE(test, "self/selfAsParameter.e");
};

exports.testSelfMember = function(test) {
	compareResourceEOE(test, "self/selfMember.e");
};

