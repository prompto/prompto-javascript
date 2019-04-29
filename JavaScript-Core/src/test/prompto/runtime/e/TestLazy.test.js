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

exports.testInterpretedCyclic = function(test) {
	checkInterpretedOutput(test, "lazy/cyclic.pec");
};

exports.testTranspiledCyclic = function(test) {
	checkTranspiledOutput(test, "lazy/cyclic.pec");
};

exports.testInterpretedDict = function(test) {
	checkInterpretedOutput(test, "lazy/dict.pec");
};

exports.testTranspiledDict = function(test) {
	checkTranspiledOutput(test, "lazy/dict.pec");
};

exports.testInterpretedList = function(test) {
	checkInterpretedOutput(test, "lazy/list.pec");
};

exports.testTranspiledList = function(test) {
	checkTranspiledOutput(test, "lazy/list.pec");
};

exports.testInterpretedSet = function(test) {
	checkInterpretedOutput(test, "lazy/set.pec");
};

exports.testTranspiledSet = function(test) {
	checkTranspiledOutput(test, "lazy/set.pec");
};

exports.testInterpretedTransient = function(test) {
	checkInterpretedOutput(test, "lazy/transient.pec");
};

exports.testTranspiledTransient = function(test) {
	checkTranspiledOutput(test, "lazy/transient.pec");
};

