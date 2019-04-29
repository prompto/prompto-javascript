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

exports.testInterpretedGtCharacter = function(test) {
	checkInterpretedOutput(test, "greater/gtCharacter.poc");
};

exports.testTranspiledGtCharacter = function(test) {
	checkTranspiledOutput(test, "greater/gtCharacter.poc");
};

exports.testInterpretedGtDate = function(test) {
	checkInterpretedOutput(test, "greater/gtDate.poc");
};

exports.testTranspiledGtDate = function(test) {
	checkTranspiledOutput(test, "greater/gtDate.poc");
};

exports.testInterpretedGtDateTime = function(test) {
	checkInterpretedOutput(test, "greater/gtDateTime.poc");
};

exports.testTranspiledGtDateTime = function(test) {
	checkTranspiledOutput(test, "greater/gtDateTime.poc");
};

exports.testInterpretedGtDecimal = function(test) {
	checkInterpretedOutput(test, "greater/gtDecimal.poc");
};

exports.testTranspiledGtDecimal = function(test) {
	checkTranspiledOutput(test, "greater/gtDecimal.poc");
};

exports.testInterpretedGtInteger = function(test) {
	checkInterpretedOutput(test, "greater/gtInteger.poc");
};

exports.testTranspiledGtInteger = function(test) {
	checkTranspiledOutput(test, "greater/gtInteger.poc");
};

exports.testInterpretedGtText = function(test) {
	checkInterpretedOutput(test, "greater/gtText.poc");
};

exports.testTranspiledGtText = function(test) {
	checkTranspiledOutput(test, "greater/gtText.poc");
};

exports.testInterpretedGtTime = function(test) {
	checkInterpretedOutput(test, "greater/gtTime.poc");
};

exports.testTranspiledGtTime = function(test) {
	checkTranspiledOutput(test, "greater/gtTime.poc");
};

exports.testInterpretedGtVersion = function(test) {
	checkInterpretedOutput(test, "greater/gtVersion.poc");
};

exports.testTranspiledGtVersion = function(test) {
	checkTranspiledOutput(test, "greater/gtVersion.poc");
};

exports.testInterpretedGteCharacter = function(test) {
	checkInterpretedOutput(test, "greater/gteCharacter.poc");
};

exports.testTranspiledGteCharacter = function(test) {
	checkTranspiledOutput(test, "greater/gteCharacter.poc");
};

exports.testInterpretedGteDate = function(test) {
	checkInterpretedOutput(test, "greater/gteDate.poc");
};

exports.testTranspiledGteDate = function(test) {
	checkTranspiledOutput(test, "greater/gteDate.poc");
};

exports.testInterpretedGteDateTime = function(test) {
	checkInterpretedOutput(test, "greater/gteDateTime.poc");
};

exports.testTranspiledGteDateTime = function(test) {
	checkTranspiledOutput(test, "greater/gteDateTime.poc");
};

exports.testInterpretedGteDecimal = function(test) {
	checkInterpretedOutput(test, "greater/gteDecimal.poc");
};

exports.testTranspiledGteDecimal = function(test) {
	checkTranspiledOutput(test, "greater/gteDecimal.poc");
};

exports.testInterpretedGteInteger = function(test) {
	checkInterpretedOutput(test, "greater/gteInteger.poc");
};

exports.testTranspiledGteInteger = function(test) {
	checkTranspiledOutput(test, "greater/gteInteger.poc");
};

exports.testInterpretedGteText = function(test) {
	checkInterpretedOutput(test, "greater/gteText.poc");
};

exports.testTranspiledGteText = function(test) {
	checkTranspiledOutput(test, "greater/gteText.poc");
};

exports.testInterpretedGteTime = function(test) {
	checkInterpretedOutput(test, "greater/gteTime.poc");
};

exports.testTranspiledGteTime = function(test) {
	checkTranspiledOutput(test, "greater/gteTime.poc");
};

