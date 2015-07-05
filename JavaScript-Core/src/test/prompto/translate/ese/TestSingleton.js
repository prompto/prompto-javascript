// generated: 2015-07-05T23:01:02.181
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAttribute = function(test) {
	compareResourceESE(test, "singleton/attribute.pec");
};

exports.testMember = function(test) {
	compareResourceESE(test, "singleton/member.pec");
};

