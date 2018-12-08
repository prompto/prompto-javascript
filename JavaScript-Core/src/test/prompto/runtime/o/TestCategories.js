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

exports.testInterpretedCopyFromAscendant = function(test) {
	checkInterpretedOutput(test, "categories/copyFromAscendant.poc");
};

exports.testTranspiledCopyFromAscendant = function(test) {
	checkTranspiledOutput(test, "categories/copyFromAscendant.poc");
};

exports.testInterpretedCopyFromAscendantWithOverride = function(test) {
	checkInterpretedOutput(test, "categories/copyFromAscendantWithOverride.poc");
};

exports.testTranspiledCopyFromAscendantWithOverride = function(test) {
	checkTranspiledOutput(test, "categories/copyFromAscendantWithOverride.poc");
};

exports.testInterpretedCopyFromDescendant = function(test) {
	checkInterpretedOutput(test, "categories/copyFromDescendant.poc");
};

exports.testTranspiledCopyFromDescendant = function(test) {
	checkTranspiledOutput(test, "categories/copyFromDescendant.poc");
};

exports.testInterpretedCopyFromDescendantWithOverride = function(test) {
	checkInterpretedOutput(test, "categories/copyFromDescendantWithOverride.poc");
};

exports.testTranspiledCopyFromDescendantWithOverride = function(test) {
	checkTranspiledOutput(test, "categories/copyFromDescendantWithOverride.poc");
};

exports.testInterpretedCopyFromDocument = function(test) {
	checkInterpretedOutput(test, "categories/copyFromDocument.poc");
};

exports.testTranspiledCopyFromDocument = function(test) {
	checkTranspiledOutput(test, "categories/copyFromDocument.poc");
};

exports.testInterpretedCopyFromStored = function(test) {
	checkInterpretedOutput(test, "categories/copyFromStored.poc");
};

exports.testTranspiledCopyFromStored = function(test) {
	checkTranspiledOutput(test, "categories/copyFromStored.poc");
};

