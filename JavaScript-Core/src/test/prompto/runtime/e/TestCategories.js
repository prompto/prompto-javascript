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

exports.testInterpretedAnyAsParameter = function(test) {
	checkInterpretedOutput(test, "categories/anyAsParameter.pec");
};

exports.testTranspiledAnyAsParameter = function(test) {
	checkTranspiledOutput(test, "categories/anyAsParameter.pec");
};

exports.testInterpretedComposed = function(test) {
	checkInterpretedOutput(test, "categories/composed.pec");
};

exports.testTranspiledComposed = function(test) {
	checkTranspiledOutput(test, "categories/composed.pec");
};

exports.testInterpretedCopyFromAscendant = function(test) {
	checkInterpretedOutput(test, "categories/copyFromAscendant.pec");
};

exports.testTranspiledCopyFromAscendant = function(test) {
	checkTranspiledOutput(test, "categories/copyFromAscendant.pec");
};

exports.testInterpretedCopyFromAscendantWithOverride = function(test) {
	checkInterpretedOutput(test, "categories/copyFromAscendantWithOverride.pec");
};

exports.testTranspiledCopyFromAscendantWithOverride = function(test) {
	checkTranspiledOutput(test, "categories/copyFromAscendantWithOverride.pec");
};

exports.testInterpretedCopyFromDescendant = function(test) {
	checkInterpretedOutput(test, "categories/copyFromDescendant.pec");
};

exports.testTranspiledCopyFromDescendant = function(test) {
	checkTranspiledOutput(test, "categories/copyFromDescendant.pec");
};

exports.testInterpretedCopyFromDescendantWithOverride = function(test) {
	checkInterpretedOutput(test, "categories/copyFromDescendantWithOverride.pec");
};

exports.testTranspiledCopyFromDescendantWithOverride = function(test) {
	checkTranspiledOutput(test, "categories/copyFromDescendantWithOverride.pec");
};

exports.testInterpretedCopyFromDocument = function(test) {
	checkInterpretedOutput(test, "categories/copyFromDocument.pec");
};

exports.testTranspiledCopyFromDocument = function(test) {
	checkTranspiledOutput(test, "categories/copyFromDocument.pec");
};

exports.testInterpretedCopyFromStored = function(test) {
	checkInterpretedOutput(test, "categories/copyFromStored.pec");
};

exports.testTranspiledCopyFromStored = function(test) {
	checkTranspiledOutput(test, "categories/copyFromStored.pec");
};

