require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSelfAsParameter = function(test) {
	compareResourceEOE(test, "self/selfAsParameter.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testSelfMember = function(test) {
	compareResourceEOE(test, "self/selfMember.pec");
};

