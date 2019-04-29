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

exports.testInterpretedGlobalClosureNoArg = function(test) {
	checkInterpretedOutput(test, "closures/globalClosureNoArg.pec");
};

exports.testTranspiledGlobalClosureNoArg = function(test) {
	checkTranspiledOutput(test, "closures/globalClosureNoArg.pec");
};

exports.testInterpretedGlobalClosureWithArg = function(test) {
	checkInterpretedOutput(test, "closures/globalClosureWithArg.pec");
};

exports.testTranspiledGlobalClosureWithArg = function(test) {
	checkTranspiledOutput(test, "closures/globalClosureWithArg.pec");
};

exports.testInterpretedInstanceClosureNoArg = function(test) {
	checkInterpretedOutput(test, "closures/instanceClosureNoArg.pec");
};

exports.testTranspiledInstanceClosureNoArg = function(test) {
	checkTranspiledOutput(test, "closures/instanceClosureNoArg.pec");
};

exports.testInterpretedParameterClosure = function(test) {
	checkInterpretedOutput(test, "closures/parameterClosure.pec");
};

exports.testTranspiledParameterClosure = function(test) {
	checkTranspiledOutput(test, "closures/parameterClosure.pec");
};

