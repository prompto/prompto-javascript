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

exports.testInterpretedGlobalClosureNoArg = function(test) {
	checkInterpretedOutput(test, "closures/globalClosureNoArg.poc");
};

exports.testTranspiledGlobalClosureNoArg = function(test) {
	checkTranspiledOutput(test, "closures/globalClosureNoArg.poc");
};

exports.testInterpretedGlobalClosureWithArg = function(test) {
	checkInterpretedOutput(test, "closures/globalClosureWithArg.poc");
};

exports.testTranspiledGlobalClosureWithArg = function(test) {
	checkTranspiledOutput(test, "closures/globalClosureWithArg.poc");
};

exports.testInterpretedInstanceClosureNoArg = function(test) {
	checkInterpretedOutput(test, "closures/instanceClosureNoArg.poc");
};

exports.testTranspiledInstanceClosureNoArg = function(test) {
	checkTranspiledOutput(test, "closures/instanceClosureNoArg.poc");
};

