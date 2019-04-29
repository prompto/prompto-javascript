require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedImmutable = function(test) {
	checkInterpretedOutput(test, "mutability/immutable.pec");
};

exports.testTranspiledImmutable = function(test) {
	checkTranspiledOutput(test, "mutability/immutable.pec");
};

exports.testInterpretedImmutableArgument = function(test) {
	checkInterpretedOutput(test, "mutability/immutableArgument.pec");
};

exports.testTranspiledImmutableArgument = function(test) {
	checkTranspiledOutput(test, "mutability/immutableArgument.pec");
};

exports.testInterpretedImmutableDict = function(test) {
	checkInterpretedOutput(test, "mutability/immutableDict.pec");
};

exports.testTranspiledImmutableDict = function(test) {
	checkTranspiledOutput(test, "mutability/immutableDict.pec");
};

exports.testInterpretedImmutableList = function(test) {
	checkInterpretedOutput(test, "mutability/immutableList.pec");
};

exports.testTranspiledImmutableList = function(test) {
	checkTranspiledOutput(test, "mutability/immutableList.pec");
};

exports.testInterpretedImmutableMember = function(test) {
	checkInterpretedOutput(test, "mutability/immutableMember.pec");
};

exports.testTranspiledImmutableMember = function(test) {
	checkTranspiledOutput(test, "mutability/immutableMember.pec");
};

exports.testInterpretedImmutableTuple = function(test) {
	checkInterpretedOutput(test, "mutability/immutableTuple.pec");
};

exports.testTranspiledImmutableTuple = function(test) {
	checkTranspiledOutput(test, "mutability/immutableTuple.pec");
};

exports.testInterpretedMutable = function(test) {
	checkInterpretedOutput(test, "mutability/mutable.pec");
};

exports.testTranspiledMutable = function(test) {
	checkTranspiledOutput(test, "mutability/mutable.pec");
};

exports.testInterpretedMutableArgument = function(test) {
	checkInterpretedOutput(test, "mutability/mutableArgument.pec");
};

exports.testTranspiledMutableArgument = function(test) {
	checkTranspiledOutput(test, "mutability/mutableArgument.pec");
};

exports.testInterpretedMutableChild = function(test) {
	checkInterpretedOutput(test, "mutability/mutableChild.pec");
};

exports.testTranspiledMutableChild = function(test) {
	checkTranspiledOutput(test, "mutability/mutableChild.pec");
};

exports.testInterpretedMutableDict = function(test) {
	checkInterpretedOutput(test, "mutability/mutableDict.pec");
};

exports.testTranspiledMutableDict = function(test) {
	checkTranspiledOutput(test, "mutability/mutableDict.pec");
};

exports.testInterpretedMutableInstance = function(test) {
	checkInterpretedOutput(test, "mutability/mutableInstance.pec");
};

exports.testTranspiledMutableInstance = function(test) {
	checkTranspiledOutput(test, "mutability/mutableInstance.pec");
};

exports.testInterpretedMutableList = function(test) {
	checkInterpretedOutput(test, "mutability/mutableList.pec");
};

exports.testTranspiledMutableList = function(test) {
	checkTranspiledOutput(test, "mutability/mutableList.pec");
};

exports.testInterpretedMutableMember = function(test) {
	checkInterpretedOutput(test, "mutability/mutableMember.pec");
};

exports.testTranspiledMutableMember = function(test) {
	checkTranspiledOutput(test, "mutability/mutableMember.pec");
};

exports.testInterpretedMutableTuple = function(test) {
	checkInterpretedOutput(test, "mutability/mutableTuple.pec");
};

exports.testTranspiledMutableTuple = function(test) {
	checkTranspiledOutput(test, "mutability/mutableTuple.pec");
};

