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

exports.testInterpretedCyclic = function(test) {
	checkInterpretedOutput(test, "lazy/cyclic.poc");
};

exports.testTranspiledCyclic = function(test) {
	checkTranspiledOutput(test, "lazy/cyclic.poc");
};

exports.testInterpretedDict = function(test) {
	checkInterpretedOutput(test, "lazy/dict.poc");
};

exports.testTranspiledDict = function(test) {
	checkTranspiledOutput(test, "lazy/dict.poc");
};

exports.testInterpretedList = function(test) {
	checkInterpretedOutput(test, "lazy/list.poc");
};

exports.testTranspiledList = function(test) {
	checkTranspiledOutput(test, "lazy/list.poc");
};

exports.testInterpretedSet = function(test) {
	checkInterpretedOutput(test, "lazy/set.poc");
};

exports.testTranspiledSet = function(test) {
	checkTranspiledOutput(test, "lazy/set.poc");
};

exports.testInterpretedTransient = function(test) {
	checkInterpretedOutput(test, "lazy/transient.poc");
};

exports.testTranspiledTransient = function(test) {
	checkTranspiledOutput(test, "lazy/transient.poc");
};

