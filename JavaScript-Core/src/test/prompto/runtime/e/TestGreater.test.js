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

exports.testInterpretedGtCharacter = function(test) {
	checkInterpretedOutput(test, "greater/gtCharacter.pec");
};

exports.testTranspiledGtCharacter = function(test) {
	checkTranspiledOutput(test, "greater/gtCharacter.pec");
};

exports.testInterpretedGtDate = function(test) {
	checkInterpretedOutput(test, "greater/gtDate.pec");
};

exports.testTranspiledGtDate = function(test) {
	checkTranspiledOutput(test, "greater/gtDate.pec");
};

exports.testInterpretedGtDateTime = function(test) {
	checkInterpretedOutput(test, "greater/gtDateTime.pec");
};

exports.testTranspiledGtDateTime = function(test) {
	checkTranspiledOutput(test, "greater/gtDateTime.pec");
};

exports.testInterpretedGtDecimal = function(test) {
	checkInterpretedOutput(test, "greater/gtDecimal.pec");
};

exports.testTranspiledGtDecimal = function(test) {
	checkTranspiledOutput(test, "greater/gtDecimal.pec");
};

exports.testInterpretedGtInteger = function(test) {
	checkInterpretedOutput(test, "greater/gtInteger.pec");
};

exports.testTranspiledGtInteger = function(test) {
	checkTranspiledOutput(test, "greater/gtInteger.pec");
};

exports.testInterpretedGtText = function(test) {
	checkInterpretedOutput(test, "greater/gtText.pec");
};

exports.testTranspiledGtText = function(test) {
	checkTranspiledOutput(test, "greater/gtText.pec");
};

exports.testInterpretedGtTime = function(test) {
	checkInterpretedOutput(test, "greater/gtTime.pec");
};

exports.testTranspiledGtTime = function(test) {
	checkTranspiledOutput(test, "greater/gtTime.pec");
};

exports.testInterpretedGtVersion = function(test) {
	checkInterpretedOutput(test, "greater/gtVersion.pec");
};

exports.testTranspiledGtVersion = function(test) {
	checkTranspiledOutput(test, "greater/gtVersion.pec");
};

exports.testInterpretedGteCharacter = function(test) {
	checkInterpretedOutput(test, "greater/gteCharacter.pec");
};

exports.testTranspiledGteCharacter = function(test) {
	checkTranspiledOutput(test, "greater/gteCharacter.pec");
};

exports.testInterpretedGteDate = function(test) {
	checkInterpretedOutput(test, "greater/gteDate.pec");
};

exports.testTranspiledGteDate = function(test) {
	checkTranspiledOutput(test, "greater/gteDate.pec");
};

exports.testInterpretedGteDateTime = function(test) {
	checkInterpretedOutput(test, "greater/gteDateTime.pec");
};

exports.testTranspiledGteDateTime = function(test) {
	checkTranspiledOutput(test, "greater/gteDateTime.pec");
};

exports.testInterpretedGteDecimal = function(test) {
	checkInterpretedOutput(test, "greater/gteDecimal.pec");
};

exports.testTranspiledGteDecimal = function(test) {
	checkTranspiledOutput(test, "greater/gteDecimal.pec");
};

exports.testInterpretedGteInteger = function(test) {
	checkInterpretedOutput(test, "greater/gteInteger.pec");
};

exports.testTranspiledGteInteger = function(test) {
	checkTranspiledOutput(test, "greater/gteInteger.pec");
};

exports.testInterpretedGteText = function(test) {
	checkInterpretedOutput(test, "greater/gteText.pec");
};

exports.testTranspiledGteText = function(test) {
	checkTranspiledOutput(test, "greater/gteText.pec");
};

exports.testInterpretedGteTime = function(test) {
	checkInterpretedOutput(test, "greater/gteTime.pec");
};

exports.testTranspiledGteTime = function(test) {
	checkTranspiledOutput(test, "greater/gteTime.pec");
};

