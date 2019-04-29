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

exports.testInterpretedMultiAssignment = function(test) {
	checkInterpretedOutput(test, "tuples/multiAssignment.pec");
};

exports.testTranspiledMultiAssignment = function(test) {
	checkTranspiledOutput(test, "tuples/multiAssignment.pec");
};

exports.testInterpretedSingleAssignment = function(test) {
	checkInterpretedOutput(test, "tuples/singleAssignment.pec");
};

exports.testTranspiledSingleAssignment = function(test) {
	checkTranspiledOutput(test, "tuples/singleAssignment.pec");
};

exports.testInterpretedTupleElement = function(test) {
	checkInterpretedOutput(test, "tuples/tupleElement.pec");
};

exports.testTranspiledTupleElement = function(test) {
	checkTranspiledOutput(test, "tuples/tupleElement.pec");
};

