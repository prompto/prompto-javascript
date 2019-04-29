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

exports.testInterpretedComplexIf = function(test) {
	checkInterpretedOutput(test, "condition/complexIf.pec");
};

exports.testTranspiledComplexIf = function(test) {
	checkTranspiledOutput(test, "condition/complexIf.pec");
};

exports.testInterpretedEmbeddedIf = function(test) {
	checkInterpretedOutput(test, "condition/embeddedIf.pec");
};

exports.testTranspiledEmbeddedIf = function(test) {
	checkTranspiledOutput(test, "condition/embeddedIf.pec");
};

exports.testInterpretedReturnIf = function(test) {
	checkInterpretedOutput(test, "condition/returnIf.pec");
};

exports.testTranspiledReturnIf = function(test) {
	checkTranspiledOutput(test, "condition/returnIf.pec");
};

exports.testInterpretedSimpleIf = function(test) {
	checkInterpretedOutput(test, "condition/simpleIf.pec");
};

exports.testTranspiledSimpleIf = function(test) {
	checkTranspiledOutput(test, "condition/simpleIf.pec");
};

exports.testInterpretedSwitch = function(test) {
	checkInterpretedOutput(test, "condition/switch.pec");
};

exports.testTranspiledSwitch = function(test) {
	checkTranspiledOutput(test, "condition/switch.pec");
};

exports.testInterpretedTernary = function(test) {
	checkInterpretedOutput(test, "condition/ternary.pec");
};

exports.testTranspiledTernary = function(test) {
	checkTranspiledOutput(test, "condition/ternary.pec");
};

