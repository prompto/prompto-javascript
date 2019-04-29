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

exports.testInterpretedComplexIf = function(test) {
	checkInterpretedOutput(test, "condition/complexIf.poc");
};

exports.testTranspiledComplexIf = function(test) {
	checkTranspiledOutput(test, "condition/complexIf.poc");
};

exports.testInterpretedEmbeddedIf = function(test) {
	checkInterpretedOutput(test, "condition/embeddedIf.poc");
};

exports.testTranspiledEmbeddedIf = function(test) {
	checkTranspiledOutput(test, "condition/embeddedIf.poc");
};

exports.testInterpretedReturnIf = function(test) {
	checkInterpretedOutput(test, "condition/returnIf.poc");
};

exports.testTranspiledReturnIf = function(test) {
	checkTranspiledOutput(test, "condition/returnIf.poc");
};

exports.testInterpretedSimpleIf = function(test) {
	checkInterpretedOutput(test, "condition/simpleIf.poc");
};

exports.testTranspiledSimpleIf = function(test) {
	checkTranspiledOutput(test, "condition/simpleIf.poc");
};

exports.testInterpretedSwitch = function(test) {
	checkInterpretedOutput(test, "condition/switch.poc");
};

exports.testTranspiledSwitch = function(test) {
	checkTranspiledOutput(test, "condition/switch.poc");
};

exports.testInterpretedTernary = function(test) {
	checkInterpretedOutput(test, "condition/ternary.poc");
};

exports.testTranspiledTernary = function(test) {
	checkTranspiledOutput(test, "condition/ternary.poc");
};

