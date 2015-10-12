require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSelfAsParameter = function(test) {
	compareResourceOEO(test, "self/selfAsParameter.poc");
};

exports.testSelfMember = function(test) {
	compareResourceOEO(test, "self/selfMember.poc");
};

