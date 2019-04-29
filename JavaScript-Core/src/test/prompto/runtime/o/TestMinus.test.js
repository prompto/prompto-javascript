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

exports.testInterpretedMinusDecimal = function(test) {
	checkInterpretedOutput(test, "minus/minusDecimal.poc");
};

exports.testTranspiledMinusDecimal = function(test) {
	checkTranspiledOutput(test, "minus/minusDecimal.poc");
};

exports.testInterpretedMinusInteger = function(test) {
	checkInterpretedOutput(test, "minus/minusInteger.poc");
};

exports.testTranspiledMinusInteger = function(test) {
	checkTranspiledOutput(test, "minus/minusInteger.poc");
};

exports.testInterpretedMinusPeriod = function(test) {
	checkInterpretedOutput(test, "minus/minusPeriod.poc");
};

exports.testTranspiledMinusPeriod = function(test) {
	checkTranspiledOutput(test, "minus/minusPeriod.poc");
};

