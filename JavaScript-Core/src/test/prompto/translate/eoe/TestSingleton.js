require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAttribute = function(test) {
	compareResourceEOE(test, "singleton/attribute.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testMember = function(test) {
	compareResourceEOE(test, "singleton/member.pec");
};

