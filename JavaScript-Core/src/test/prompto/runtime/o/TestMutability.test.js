require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedImmutable = function(test) {
	checkInterpretedOutput(test, "mutability/immutable.poc");
};

exports.testTranspiledImmutable = function(test) {
	checkTranspiledOutput(test, "mutability/immutable.poc");
};

exports.testInterpretedImmutableArgument = function(test) {
	checkInterpretedOutput(test, "mutability/immutableArgument.poc");
};

exports.testTranspiledImmutableArgument = function(test) {
	checkTranspiledOutput(test, "mutability/immutableArgument.poc");
};

exports.testInterpretedImmutableDict = function(test) {
	checkInterpretedOutput(test, "mutability/immutableDict.poc");
};

exports.testTranspiledImmutableDict = function(test) {
	checkTranspiledOutput(test, "mutability/immutableDict.poc");
};

exports.testInterpretedImmutableList = function(test) {
	checkInterpretedOutput(test, "mutability/immutableList.poc");
};

exports.testTranspiledImmutableList = function(test) {
	checkTranspiledOutput(test, "mutability/immutableList.poc");
};

exports.testInterpretedImmutableMember = function(test) {
	checkInterpretedOutput(test, "mutability/immutableMember.poc");
};

exports.testTranspiledImmutableMember = function(test) {
	checkTranspiledOutput(test, "mutability/immutableMember.poc");
};

exports.testInterpretedImmutableTuple = function(test) {
	checkInterpretedOutput(test, "mutability/immutableTuple.poc");
};

exports.testTranspiledImmutableTuple = function(test) {
	checkTranspiledOutput(test, "mutability/immutableTuple.poc");
};

exports.testInterpretedMutable = function(test) {
	checkInterpretedOutput(test, "mutability/mutable.poc");
};

exports.testTranspiledMutable = function(test) {
	checkTranspiledOutput(test, "mutability/mutable.poc");
};

exports.testInterpretedMutableArgument = function(test) {
	checkInterpretedOutput(test, "mutability/mutableArgument.poc");
};

exports.testTranspiledMutableArgument = function(test) {
	checkTranspiledOutput(test, "mutability/mutableArgument.poc");
};

exports.testInterpretedMutableDict = function(test) {
	checkInterpretedOutput(test, "mutability/mutableDict.poc");
};

exports.testTranspiledMutableDict = function(test) {
	checkTranspiledOutput(test, "mutability/mutableDict.poc");
};

exports.testInterpretedMutableList = function(test) {
	checkInterpretedOutput(test, "mutability/mutableList.poc");
};

exports.testTranspiledMutableList = function(test) {
	checkTranspiledOutput(test, "mutability/mutableList.poc");
};

exports.testInterpretedMutableMember = function(test) {
	checkInterpretedOutput(test, "mutability/mutableMember.poc");
};

exports.testTranspiledMutableMember = function(test) {
	checkTranspiledOutput(test, "mutability/mutableMember.poc");
};

exports.testInterpretedMutableTuple = function(test) {
	checkInterpretedOutput(test, "mutability/mutableTuple.poc");
};

exports.testTranspiledMutableTuple = function(test) {
	checkTranspiledOutput(test, "mutability/mutableTuple.poc");
};

