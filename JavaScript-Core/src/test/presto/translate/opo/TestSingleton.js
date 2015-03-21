require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testAttribute = function(test) {
	compareResourceOPO(test, "singleton/attribute.o");
};

exports.testMember = function(test) {
	compareResourceOPO(test, "singleton/member.o");
};

