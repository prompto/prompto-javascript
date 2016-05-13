require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testImmutable = function(test) {
	compareResourceOEO(test, "mutability/immutable.poc");
};

exports.testImmutableArgument = function(test) {
	compareResourceOEO(test, "mutability/immutableArgument.poc");
};

exports.testImmutableDict = function(test) {
	compareResourceOEO(test, "mutability/immutableDict.poc");
};

exports.testImmutableList = function(test) {
	compareResourceOEO(test, "mutability/immutableList.poc");
};

exports.testImmutableMember = function(test) {
	compareResourceOEO(test, "mutability/immutableMember.poc");
};

exports.testImmutableTuple = function(test) {
	compareResourceOEO(test, "mutability/immutableTuple.poc");
};

exports.testMutable = function(test) {
	compareResourceOEO(test, "mutability/mutable.poc");
};

exports.testMutableArgument = function(test) {
	compareResourceOEO(test, "mutability/mutableArgument.poc");
};

exports.testMutableDict = function(test) {
	compareResourceOEO(test, "mutability/mutableDict.poc");
};

exports.testMutableList = function(test) {
	compareResourceOEO(test, "mutability/mutableList.poc");
};

exports.testMutableMember = function(test) {
	compareResourceOEO(test, "mutability/mutableMember.poc");
};

exports.testMutableTuple = function(test) {
	compareResourceOEO(test, "mutability/mutableTuple.poc");
};

