require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testSelfAsParameter = function(test) {
	compareResourceOSO(test, "self/selfAsParameter.poc");
};

exports.testSelfMember = function(test) {
	compareResourceOSO(test, "self/selfMember.poc");
};

