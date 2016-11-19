require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testImmutable = function(test) {
	compareResourceEME(test, "mutability/immutable.pec");
};

exports.testImmutableArgument = function(test) {
	compareResourceEME(test, "mutability/immutableArgument.pec");
};

exports.testImmutableDict = function(test) {
	compareResourceEME(test, "mutability/immutableDict.pec");
};

exports.testImmutableList = function(test) {
	compareResourceEME(test, "mutability/immutableList.pec");
};

exports.testImmutableMember = function(test) {
	compareResourceEME(test, "mutability/immutableMember.pec");
};

exports.testImmutableTuple = function(test) {
	compareResourceEME(test, "mutability/immutableTuple.pec");
};

exports.testMutable = function(test) {
	compareResourceEME(test, "mutability/mutable.pec");
};

exports.testMutableArgument = function(test) {
	compareResourceEME(test, "mutability/mutableArgument.pec");
};

exports.testMutableDict = function(test) {
	compareResourceEME(test, "mutability/mutableDict.pec");
};

exports.testMutableList = function(test) {
	compareResourceEME(test, "mutability/mutableList.pec");
};

exports.testMutableMember = function(test) {
	compareResourceEME(test, "mutability/mutableMember.pec");
};

exports.testMutableTuple = function(test) {
	compareResourceEME(test, "mutability/mutableTuple.pec");
};

