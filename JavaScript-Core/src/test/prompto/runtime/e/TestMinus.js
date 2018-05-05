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

exports.testInterpretedMinusDecimal = function(test) {
	checkInterpretedOutput(test, "minus/minusDecimal.pec");
};

exports.testTranspiledMinusDecimal = function(test) {
	checkTranspiledOutput(test, "minus/minusDecimal.pec");
};

exports.testInterpretedMinusInteger = function(test) {
	checkInterpretedOutput(test, "minus/minusInteger.pec");
};

exports.testTranspiledMinusInteger = function(test) {
	checkTranspiledOutput(test, "minus/minusInteger.pec");
};

exports.testInterpretedMinusPeriod = function(test) {
	checkInterpretedOutput(test, "minus/minusPeriod.pec");
};

exports.testTranspiledMinusPeriod = function(test) {
	checkTranspiledOutput(test, "minus/minusPeriod.pec");
};

