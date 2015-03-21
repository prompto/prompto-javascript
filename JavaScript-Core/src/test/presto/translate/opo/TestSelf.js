require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testSelfAsParameter = function(test) {
	compareResourceOPO(test, "self/selfAsParameter.o");
};

exports.testSelfMember = function(test) {
	compareResourceOPO(test, "self/selfMember.o");
};

