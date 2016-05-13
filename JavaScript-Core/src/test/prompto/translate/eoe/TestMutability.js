require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testImmutable = function(test) {
	compareResourceEOE(test, "mutability/immutable.pec");
};

exports.testImmutableArgument = function(test) {
	compareResourceEOE(test, "mutability/immutableArgument.pec");
};

exports.testImmutableDict = function(test) {
	compareResourceEOE(test, "mutability/immutableDict.pec");
};

exports.testImmutableList = function(test) {
	compareResourceEOE(test, "mutability/immutableList.pec");
};

exports.testImmutableMember = function(test) {
	compareResourceEOE(test, "mutability/immutableMember.pec");
};

exports.testImmutableTuple = function(test) {
	compareResourceEOE(test, "mutability/immutableTuple.pec");
};

exports.testMutable = function(test) {
	compareResourceEOE(test, "mutability/mutable.pec");
};

exports.testMutableArgument = function(test) {
	compareResourceEOE(test, "mutability/mutableArgument.pec");
};

exports.testMutableDict = function(test) {
	compareResourceEOE(test, "mutability/mutableDict.pec");
};

exports.testMutableList = function(test) {
	compareResourceEOE(test, "mutability/mutableList.pec");
};

exports.testMutableMember = function(test) {
	compareResourceEOE(test, "mutability/mutableMember.pec");
};

exports.testMutableTuple = function(test) {
	compareResourceEOE(test, "mutability/mutableTuple.pec");
};

