require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testImmutable = function(test) {
	compareResourceOSO(test, "mutability/immutable.poc");
};

exports.testImmutableArgument = function(test) {
	compareResourceOSO(test, "mutability/immutableArgument.poc");
};

exports.testImmutableDict = function(test) {
	compareResourceOSO(test, "mutability/immutableDict.poc");
};

exports.testImmutableList = function(test) {
	compareResourceOSO(test, "mutability/immutableList.poc");
};

exports.testImmutableMember = function(test) {
	compareResourceOSO(test, "mutability/immutableMember.poc");
};

exports.testImmutableTuple = function(test) {
	compareResourceOSO(test, "mutability/immutableTuple.poc");
};

exports.testMutable = function(test) {
	compareResourceOSO(test, "mutability/mutable.poc");
};

exports.testMutableArgument = function(test) {
	compareResourceOSO(test, "mutability/mutableArgument.poc");
};

exports.testMutableDict = function(test) {
	compareResourceOSO(test, "mutability/mutableDict.poc");
};

exports.testMutableList = function(test) {
	compareResourceOSO(test, "mutability/mutableList.poc");
};

exports.testMutableMember = function(test) {
	compareResourceOSO(test, "mutability/mutableMember.poc");
};

exports.testMutableTuple = function(test) {
	compareResourceOSO(test, "mutability/mutableTuple.poc");
};

