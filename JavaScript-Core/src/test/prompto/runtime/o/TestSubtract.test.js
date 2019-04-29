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

exports.testInterpretedSubDate = function(test) {
	checkInterpretedOutput(test, "subtract/subDate.poc");
};

exports.testTranspiledSubDate = function(test) {
	checkTranspiledOutput(test, "subtract/subDate.poc");
};

exports.testInterpretedSubDateTime = function(test) {
	checkInterpretedOutput(test, "subtract/subDateTime.poc");
};

exports.testTranspiledSubDateTime = function(test) {
	checkTranspiledOutput(test, "subtract/subDateTime.poc");
};

exports.testInterpretedSubDecimal = function(test) {
	checkInterpretedOutput(test, "subtract/subDecimal.poc");
};

exports.testTranspiledSubDecimal = function(test) {
	checkTranspiledOutput(test, "subtract/subDecimal.poc");
};

exports.testInterpretedSubInteger = function(test) {
	checkInterpretedOutput(test, "subtract/subInteger.poc");
};

exports.testTranspiledSubInteger = function(test) {
	checkTranspiledOutput(test, "subtract/subInteger.poc");
};

exports.testInterpretedSubList = function(test) {
	checkInterpretedOutput(test, "subtract/subList.poc");
};

exports.testTranspiledSubList = function(test) {
	checkTranspiledOutput(test, "subtract/subList.poc");
};

exports.testInterpretedSubPeriod = function(test) {
	checkInterpretedOutput(test, "subtract/subPeriod.poc");
};

exports.testTranspiledSubPeriod = function(test) {
	checkTranspiledOutput(test, "subtract/subPeriod.poc");
};

exports.testInterpretedSubSet = function(test) {
	checkInterpretedOutput(test, "subtract/subSet.poc");
};

exports.testTranspiledSubSet = function(test) {
	checkTranspiledOutput(test, "subtract/subSet.poc");
};

exports.testInterpretedSubTime = function(test) {
	checkInterpretedOutput(test, "subtract/subTime.poc");
};

exports.testTranspiledSubTime = function(test) {
	checkTranspiledOutput(test, "subtract/subTime.poc");
};

