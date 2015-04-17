require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testImmutable = function(test) {
	compareResourceESE(test, "mutability/immutable.pec");
};

exports.testImmutableMember = function(test) {
	compareResourceESE(test, "mutability/immutableMember.pec");
};

exports.testMutable = function(test) {
	compareResourceESE(test, "mutability/mutable.pec");
};

exports.testMutableMember = function(test) {
	compareResourceESE(test, "mutability/mutableMember.pec");
};

