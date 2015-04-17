require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testImmutable = function(test) {
	compareResourceOSO(test, "mutability/immutable.poc");
};

exports.testImmutableMember = function(test) {
	compareResourceOSO(test, "mutability/immutableMember.poc");
};

exports.testMutable = function(test) {
	compareResourceOSO(test, "mutability/mutable.poc");
};

exports.testMutableMember = function(test) {
	compareResourceOSO(test, "mutability/mutableMember.poc");
};

