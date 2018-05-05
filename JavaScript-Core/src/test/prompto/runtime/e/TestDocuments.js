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

exports.testInterpretedBlob = function(test) {
	checkInterpretedOutput(test, "documents/blob.pec");
};

exports.testTranspiledBlob = function(test) {
	checkTranspiledOutput(test, "documents/blob.pec");
};

exports.testInterpretedDeepItem = function(test) {
	checkInterpretedOutput(test, "documents/deepItem.pec");
};

exports.testTranspiledDeepItem = function(test) {
	checkTranspiledOutput(test, "documents/deepItem.pec");
};

exports.testInterpretedDeepVariable = function(test) {
	checkInterpretedOutput(test, "documents/deepVariable.pec");
};

exports.testTranspiledDeepVariable = function(test) {
	checkTranspiledOutput(test, "documents/deepVariable.pec");
};

exports.testInterpretedItem = function(test) {
	checkInterpretedOutput(test, "documents/item.pec");
};

exports.testTranspiledItem = function(test) {
	checkTranspiledOutput(test, "documents/item.pec");
};

exports.testInterpretedNamedItem = function(test) {
	checkInterpretedOutput(test, "documents/namedItem.pec");
};

exports.testTranspiledNamedItem = function(test) {
	checkTranspiledOutput(test, "documents/namedItem.pec");
};

exports.testInterpretedVariable = function(test) {
	checkInterpretedOutput(test, "documents/variable.pec");
};

exports.testTranspiledVariable = function(test) {
	checkTranspiledOutput(test, "documents/variable.pec");
};

