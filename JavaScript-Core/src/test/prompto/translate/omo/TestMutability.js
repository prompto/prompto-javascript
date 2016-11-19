require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testImmutable = function(test) {
	compareResourceOMO(test, "mutability/immutable.poc");
};

exports.testImmutableArgument = function(test) {
	compareResourceOMO(test, "mutability/immutableArgument.poc");
};

exports.testImmutableDict = function(test) {
	compareResourceOMO(test, "mutability/immutableDict.poc");
};

exports.testImmutableList = function(test) {
	compareResourceOMO(test, "mutability/immutableList.poc");
};

exports.testImmutableMember = function(test) {
	compareResourceOMO(test, "mutability/immutableMember.poc");
};

exports.testImmutableTuple = function(test) {
	compareResourceOMO(test, "mutability/immutableTuple.poc");
};

exports.testMutable = function(test) {
	compareResourceOMO(test, "mutability/mutable.poc");
};

exports.testMutableArgument = function(test) {
	compareResourceOMO(test, "mutability/mutableArgument.poc");
};

exports.testMutableDict = function(test) {
	compareResourceOMO(test, "mutability/mutableDict.poc");
};

exports.testMutableList = function(test) {
	compareResourceOMO(test, "mutability/mutableList.poc");
};

exports.testMutableMember = function(test) {
	compareResourceOMO(test, "mutability/mutableMember.poc");
};

exports.testMutableTuple = function(test) {
	compareResourceOMO(test, "mutability/mutableTuple.poc");
};

