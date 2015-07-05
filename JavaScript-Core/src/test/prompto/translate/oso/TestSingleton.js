// generated: 2015-07-05T23:01:02.184
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAttribute = function(test) {
	compareResourceOSO(test, "singleton/attribute.poc");
};

exports.testMember = function(test) {
	compareResourceOSO(test, "singleton/member.poc");
};

