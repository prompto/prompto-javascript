require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSelfAsParameter = function(test) {
	compareResourceOEO(test, "self/selfAsParameter.o");
};

exports.testSelfMember = function(test) {
	compareResourceOEO(test, "self/selfMember.o");
};

