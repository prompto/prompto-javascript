// generated: 2015-07-05T23:01:02.183
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAttribute = function(test) {
	compareResourceOEO(test, "singleton/attribute.poc");
};

exports.testMember = function(test) {
	compareResourceOEO(test, "singleton/member.poc");
};

