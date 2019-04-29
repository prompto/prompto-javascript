require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAttribute = function(test) {
	compareResourceOEO(test, "singleton/attribute.poc");
};

exports.testMember = function(test) {
	compareResourceOEO(test, "singleton/member.poc");
};

