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

exports.testInterpretedMultiAssignment = function(test) {
	checkInterpretedOutput(test, "tuples/multiAssignment.poc");
};

exports.testTranspiledMultiAssignment = function(test) {
	checkTranspiledOutput(test, "tuples/multiAssignment.poc");
};

exports.testInterpretedSingleAssignment = function(test) {
	checkInterpretedOutput(test, "tuples/singleAssignment.poc");
};

exports.testTranspiledSingleAssignment = function(test) {
	checkTranspiledOutput(test, "tuples/singleAssignment.poc");
};

exports.testInterpretedTupleElement = function(test) {
	checkInterpretedOutput(test, "tuples/tupleElement.poc");
};

exports.testTranspiledTupleElement = function(test) {
	checkTranspiledOutput(test, "tuples/tupleElement.poc");
};

