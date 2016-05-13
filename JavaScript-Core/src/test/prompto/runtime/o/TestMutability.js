require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testImmutable = function(test) {
	checkOutput(test, "mutability/immutable.poc");
};

exports.testImmutableArgument = function(test) {
	checkOutput(test, "mutability/immutableArgument.poc");
};

exports.testImmutableDict = function(test) {
	checkOutput(test, "mutability/immutableDict.poc");
};

exports.testImmutableList = function(test) {
	checkOutput(test, "mutability/immutableList.poc");
};

exports.testImmutableMember = function(test) {
	checkOutput(test, "mutability/immutableMember.poc");
};

exports.testImmutableTuple = function(test) {
	checkOutput(test, "mutability/immutableTuple.poc");
};

exports.testMutable = function(test) {
	checkOutput(test, "mutability/mutable.poc");
};

exports.testMutableArgument = function(test) {
	checkOutput(test, "mutability/mutableArgument.poc");
};

exports.testMutableDict = function(test) {
	checkOutput(test, "mutability/mutableDict.poc");
};

exports.testMutableList = function(test) {
	checkOutput(test, "mutability/mutableList.poc");
};

exports.testMutableMember = function(test) {
	checkOutput(test, "mutability/mutableMember.poc");
};

exports.testMutableTuple = function(test) {
	checkOutput(test, "mutability/mutableTuple.poc");
};

