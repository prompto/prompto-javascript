// generated: 2015-07-05T23:01:02.169
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSelfAsParameter = function(test) {
	compareResourceOEO(test, "self/selfAsParameter.poc");
};

exports.testSelfMember = function(test) {
	compareResourceOEO(test, "self/selfMember.poc");
};

