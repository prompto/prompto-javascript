require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testImmutable = function(test) {
	compareResourceEOE(test, "mutability/immutable.pec");
};

exports.testImmutableMember = function(test) {
	compareResourceEOE(test, "mutability/immutableMember.pec");
};

exports.testMutable = function(test) {
	compareResourceEOE(test, "mutability/mutable.pec");
};

exports.testMutableMember = function(test) {
	compareResourceEOE(test, "mutability/mutableMember.pec");
};

