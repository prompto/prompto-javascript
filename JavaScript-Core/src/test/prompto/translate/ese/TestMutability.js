// generated: 2015-07-05T23:01:02.137
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testImmutable = function(test) {
	compareResourceESE(test, "mutability/immutable.pec");
};

exports.testImmutableArgument = function(test) {
	compareResourceESE(test, "mutability/immutableArgument.pec");
};

exports.testImmutableMember = function(test) {
	compareResourceESE(test, "mutability/immutableMember.pec");
};

exports.testMutable = function(test) {
	compareResourceESE(test, "mutability/mutable.pec");
};

exports.testMutableArgument = function(test) {
	compareResourceESE(test, "mutability/mutableArgument.pec");
};

exports.testMutableMember = function(test) {
	compareResourceESE(test, "mutability/mutableMember.pec");
};
