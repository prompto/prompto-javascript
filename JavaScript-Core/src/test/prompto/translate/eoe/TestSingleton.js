// generated: 2015-07-05T23:01:02.180
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAttribute = function(test) {
	compareResourceEOE(test, "singleton/attribute.pec");
};

exports.testMember = function(test) {
	compareResourceEOE(test, "singleton/member.pec");
};

