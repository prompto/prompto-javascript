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

exports.testInterpretedContainsItem = function(test) {
	checkInterpretedOutput(test, "predicate/containsItem.pec");
};

exports.testTranspiledContainsItem = function(test) {
	checkTranspiledOutput(test, "predicate/containsItem.pec");
};

exports.testInterpretedEquals = function(test) {
	checkInterpretedOutput(test, "predicate/equals.pec");
};

exports.testTranspiledEquals = function(test) {
	checkTranspiledOutput(test, "predicate/equals.pec");
};

exports.testInterpretedGreater = function(test) {
	checkInterpretedOutput(test, "predicate/greater.pec");
};

exports.testTranspiledGreater = function(test) {
	checkTranspiledOutput(test, "predicate/greater.pec");
};

exports.testInterpretedHasItem = function(test) {
	checkInterpretedOutput(test, "predicate/hasItem.pec");
};

exports.testTranspiledHasItem = function(test) {
	checkTranspiledOutput(test, "predicate/hasItem.pec");
};

exports.testInterpretedInList = function(test) {
	checkInterpretedOutput(test, "predicate/inList.pec");
};

exports.testTranspiledInList = function(test) {
	checkTranspiledOutput(test, "predicate/inList.pec");
};

exports.testInterpretedLesser = function(test) {
	checkInterpretedOutput(test, "predicate/lesser.pec");
};

exports.testTranspiledLesser = function(test) {
	checkTranspiledOutput(test, "predicate/lesser.pec");
};

exports.testInterpretedNotEquals = function(test) {
	checkInterpretedOutput(test, "predicate/notEquals.pec");
};

exports.testTranspiledNotEquals = function(test) {
	checkTranspiledOutput(test, "predicate/notEquals.pec");
};

exports.testInterpretedPartial = function(test) {
	checkInterpretedOutput(test, "predicate/partial.pec");
};

exports.testTranspiledPartial = function(test) {
	checkTranspiledOutput(test, "predicate/partial.pec");
};

exports.testInterpretedRoughly = function(test) {
	checkInterpretedOutput(test, "predicate/roughly.pec");
};

exports.testTranspiledRoughly = function(test) {
	checkTranspiledOutput(test, "predicate/roughly.pec");
};

