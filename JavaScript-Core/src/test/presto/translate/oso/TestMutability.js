require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testImmutable = function(test) {
	compareResourceOSO(test, "mutability/immutable.poc");
};

exports.testImmutableArgument = function(test) {
	compareResourceOSO(test, "mutability/immutableArgument.poc");
};

exports.testImmutableMember = function(test) {
	compareResourceOSO(test, "mutability/immutableMember.poc");
};

exports.testMutable = function(test) {
	compareResourceOSO(test, "mutability/mutable.poc");
};

exports.testMutableArgument = function(test) {
	compareResourceOSO(test, "mutability/mutableArgument.poc");
};

exports.testMutableMember = function(test) {
	compareResourceOSO(test, "mutability/mutableMember.poc");
};

