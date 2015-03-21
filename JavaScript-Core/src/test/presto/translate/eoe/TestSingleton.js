require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAttribute = function(test) {
	compareResourceEOE(test, "singleton/attribute.e");
};

exports.testMember = function(test) {
	compareResourceEOE(test, "singleton/member.e");
};

