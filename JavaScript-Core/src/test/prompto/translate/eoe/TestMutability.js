require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testImmutable = function(test) {
	compareResourceEOE(test, "mutability/immutable.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testImmutableArgument = function(test) {
	compareResourceEOE(test, "mutability/immutableArgument.pec");
};

exports.testImmutableMember = function(test) {
	compareResourceEOE(test, "mutability/immutableMember.pec");
};

exports.testMutable = function(test) {
	compareResourceEOE(test, "mutability/mutable.pec");
};

exports.testMutableArgument = function(test) {
	compareResourceEOE(test, "mutability/mutableArgument.pec");
};

exports.testMutableMember = function(test) {
	compareResourceEOE(test, "mutability/mutableMember.pec");
};

