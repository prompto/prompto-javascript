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

exports.testInterpretedDeepItem = function(test) {
	checkInterpretedOutput(test, "documents/deepItem.poc");
};

exports.testTranspiledDeepItem = function(test) {
	checkTranspiledOutput(test, "documents/deepItem.poc");
};

exports.testInterpretedDeepVariable = function(test) {
	checkInterpretedOutput(test, "documents/deepVariable.poc");
};

exports.testTranspiledDeepVariable = function(test) {
	checkTranspiledOutput(test, "documents/deepVariable.poc");
};

exports.testInterpretedItem = function(test) {
	checkInterpretedOutput(test, "documents/item.poc");
};

exports.testTranspiledItem = function(test) {
	checkTranspiledOutput(test, "documents/item.poc");
};

exports.testInterpretedVariable = function(test) {
	checkInterpretedOutput(test, "documents/variable.poc");
};

exports.testTranspiledVariable = function(test) {
	checkTranspiledOutput(test, "documents/variable.poc");
};

