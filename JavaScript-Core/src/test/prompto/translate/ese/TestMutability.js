require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testImmutable = function(test) {
	compareResourceESE(test, "mutability/immutable.pec");
};

exports.testImmutableArgument = function(test) {
	compareResourceESE(test, "mutability/immutableArgument.pec");
};

exports.testImmutableDict = function(test) {
	compareResourceESE(test, "mutability/immutableDict.pec");
};

exports.testImmutableList = function(test) {
	compareResourceESE(test, "mutability/immutableList.pec");
};

exports.testImmutableMember = function(test) {
	compareResourceESE(test, "mutability/immutableMember.pec");
};

exports.testImmutableTuple = function(test) {
	compareResourceESE(test, "mutability/immutableTuple.pec");
};

exports.testMutable = function(test) {
	compareResourceESE(test, "mutability/mutable.pec");
};

exports.testMutableArgument = function(test) {
	compareResourceESE(test, "mutability/mutableArgument.pec");
};

exports.testMutableDict = function(test) {
	compareResourceESE(test, "mutability/mutableDict.pec");
};

exports.testMutableList = function(test) {
	compareResourceESE(test, "mutability/mutableList.pec");
};

exports.testMutableMember = function(test) {
	compareResourceESE(test, "mutability/mutableMember.pec");
};

exports.testMutableTuple = function(test) {
	compareResourceESE(test, "mutability/mutableTuple.pec");
};

