require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAttribute = function(test) {
	compareResourceOSO(test, "singleton/attribute.poc");
};

exports.testMember = function(test) {
	compareResourceOSO(test, "singleton/member.poc");
};

