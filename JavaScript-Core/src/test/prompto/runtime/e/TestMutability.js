require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testImmutable = function(test) {
	checkOutput(test, "mutability/immutable.pec");
};

exports.testImmutableArgument = function(test) {
	checkOutput(test, "mutability/immutableArgument.pec");
};

exports.testImmutableDict = function(test) {
	checkOutput(test, "mutability/immutableDict.pec");
};

exports.testImmutableList = function(test) {
	checkOutput(test, "mutability/immutableList.pec");
};

exports.testImmutableMember = function(test) {
	checkOutput(test, "mutability/immutableMember.pec");
};

exports.testImmutableTuple = function(test) {
	checkOutput(test, "mutability/immutableTuple.pec");
};

exports.testMutable = function(test) {
	checkOutput(test, "mutability/mutable.pec");
};

exports.testMutableArgument = function(test) {
	checkOutput(test, "mutability/mutableArgument.pec");
};

exports.testMutableDict = function(test) {
	checkOutput(test, "mutability/mutableDict.pec");
};

exports.testMutableList = function(test) {
	checkOutput(test, "mutability/mutableList.pec");
};

exports.testMutableMember = function(test) {
	checkOutput(test, "mutability/mutableMember.pec");
};

exports.testMutableTuple = function(test) {
	checkOutput(test, "mutability/mutableTuple.pec");
};

