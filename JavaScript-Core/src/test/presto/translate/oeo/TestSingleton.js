require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAttribute = function(test) {
	compareResourceOEO(test, "singleton/attribute.o");
};

exports.testMember = function(test) {
	compareResourceOEO(test, "singleton/member.o");
};

