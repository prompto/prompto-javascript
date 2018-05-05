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
	checkInterpretedOutput(test, "sub/subDate.poc");
};

exports.testTranspiledSubDate = function(test) {
	checkTranspiledOutput(test, "sub/subDate.poc");
};

exports.testInterpretedSubDateTime = function(test) {
	checkInterpretedOutput(test, "sub/subDateTime.poc");
};

exports.testTranspiledSubDateTime = function(test) {
	checkTranspiledOutput(test, "sub/subDateTime.poc");
};

exports.testInterpretedSubDecimal = function(test) {
	checkInterpretedOutput(test, "sub/subDecimal.poc");
};

exports.testTranspiledSubDecimal = function(test) {
	checkTranspiledOutput(test, "sub/subDecimal.poc");
};

exports.testInterpretedSubInteger = function(test) {
	checkInterpretedOutput(test, "sub/subInteger.poc");
};

exports.testTranspiledSubInteger = function(test) {
	checkTranspiledOutput(test, "sub/subInteger.poc");
};

exports.testInterpretedSubPeriod = function(test) {
	checkInterpretedOutput(test, "sub/subPeriod.poc");
};

exports.testTranspiledSubPeriod = function(test) {
	checkTranspiledOutput(test, "sub/subPeriod.poc");
};

exports.testInterpretedSubTime = function(test) {
	checkInterpretedOutput(test, "sub/subTime.poc");
};

exports.testTranspiledSubTime = function(test) {
	checkTranspiledOutput(test, "sub/subTime.poc");
};

