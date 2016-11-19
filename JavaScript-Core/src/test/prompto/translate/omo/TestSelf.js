require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testSelfAsParameter = function(test) {
	compareResourceOMO(test, "self/selfAsParameter.poc");
};

exports.testSelfMember = function(test) {
	compareResourceOMO(test, "self/selfMember.poc");
};

