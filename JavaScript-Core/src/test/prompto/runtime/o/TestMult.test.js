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

exports.testInterpretedMultCharacter = function(test) {
	checkInterpretedOutput(test, "mult/multCharacter.poc");
};

exports.testTranspiledMultCharacter = function(test) {
	checkTranspiledOutput(test, "mult/multCharacter.poc");
};

exports.testInterpretedMultDecimal = function(test) {
	checkInterpretedOutput(test, "mult/multDecimal.poc");
};

exports.testTranspiledMultDecimal = function(test) {
	checkTranspiledOutput(test, "mult/multDecimal.poc");
};

exports.testInterpretedMultInteger = function(test) {
	checkInterpretedOutput(test, "mult/multInteger.poc");
};

exports.testTranspiledMultInteger = function(test) {
	checkTranspiledOutput(test, "mult/multInteger.poc");
};

exports.testInterpretedMultList = function(test) {
	checkInterpretedOutput(test, "mult/multList.poc");
};

exports.testTranspiledMultList = function(test) {
	checkTranspiledOutput(test, "mult/multList.poc");
};

exports.testInterpretedMultPeriod = function(test) {
	checkInterpretedOutput(test, "mult/multPeriod.poc");
};

exports.testTranspiledMultPeriod = function(test) {
	checkTranspiledOutput(test, "mult/multPeriod.poc");
};

exports.testInterpretedMultText = function(test) {
	checkInterpretedOutput(test, "mult/multText.poc");
};

exports.testTranspiledMultText = function(test) {
	checkTranspiledOutput(test, "mult/multText.poc");
};

