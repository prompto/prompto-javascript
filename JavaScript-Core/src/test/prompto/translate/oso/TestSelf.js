// generated: 2015-07-05T23:01:02.170
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testSelfAsParameter = function(test) {
	compareResourceOSO(test, "self/selfAsParameter.poc");
};

exports.testSelfMember = function(test) {
	compareResourceOSO(test, "self/selfMember.poc");
};

