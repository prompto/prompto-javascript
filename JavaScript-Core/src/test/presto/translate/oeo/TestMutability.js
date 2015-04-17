require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testImmutable = function(test) {
	compareResourceOEO(test, "mutability/immutable.poc");
};

exports.testImmutableMember = function(test) {
	compareResourceOEO(test, "mutability/immutableMember.poc");
};

exports.testMutable = function(test) {
	compareResourceOEO(test, "mutability/mutable.poc");
};

exports.testMutableMember = function(test) {
	compareResourceOEO(test, "mutability/mutableMember.poc");
};

