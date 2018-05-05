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

exports.testInterpretedMultCharacter = function(test) {
	checkInterpretedOutput(test, "mult/multCharacter.pec");
};

exports.testTranspiledMultCharacter = function(test) {
	checkTranspiledOutput(test, "mult/multCharacter.pec");
};

exports.testInterpretedMultDecimal = function(test) {
	checkInterpretedOutput(test, "mult/multDecimal.pec");
};

exports.testTranspiledMultDecimal = function(test) {
	checkTranspiledOutput(test, "mult/multDecimal.pec");
};

exports.testInterpretedMultInteger = function(test) {
	checkInterpretedOutput(test, "mult/multInteger.pec");
};

exports.testTranspiledMultInteger = function(test) {
	checkTranspiledOutput(test, "mult/multInteger.pec");
};

exports.testInterpretedMultList = function(test) {
	checkInterpretedOutput(test, "mult/multList.pec");
};

exports.testTranspiledMultList = function(test) {
	checkTranspiledOutput(test, "mult/multList.pec");
};

exports.testInterpretedMultPeriod = function(test) {
	checkInterpretedOutput(test, "mult/multPeriod.pec");
};

exports.testTranspiledMultPeriod = function(test) {
	checkTranspiledOutput(test, "mult/multPeriod.pec");
};

exports.testInterpretedMultText = function(test) {
	checkInterpretedOutput(test, "mult/multText.pec");
};

exports.testTranspiledMultText = function(test) {
	checkTranspiledOutput(test, "mult/multText.pec");
};

