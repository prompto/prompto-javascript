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

exports.testInterpretedAutoDecimalCast = function(test) {
	checkInterpretedOutput(test, "cast/autoDecimalCast.pec");
};

exports.testTranspiledAutoDecimalCast = function(test) {
	checkTranspiledOutput(test, "cast/autoDecimalCast.pec");
};

exports.testInterpretedAutoDowncast = function(test) {
	checkInterpretedOutput(test, "cast/autoDowncast.pec");
};

exports.testTranspiledAutoDowncast = function(test) {
	checkTranspiledOutput(test, "cast/autoDowncast.pec");
};

exports.testInterpretedAutoIntegerCast = function(test) {
	checkInterpretedOutput(test, "cast/autoIntegerCast.pec");
};

exports.testTranspiledAutoIntegerCast = function(test) {
	checkTranspiledOutput(test, "cast/autoIntegerCast.pec");
};

exports.testInterpretedCastChild = function(test) {
	checkInterpretedOutput(test, "cast/castChild.pec");
};

exports.testTranspiledCastChild = function(test) {
	checkTranspiledOutput(test, "cast/castChild.pec");
};

exports.testInterpretedCastDecimal = function(test) {
	checkInterpretedOutput(test, "cast/castDecimal.pec");
};

exports.testTranspiledCastDecimal = function(test) {
	checkTranspiledOutput(test, "cast/castDecimal.pec");
};

exports.testInterpretedCastDocument = function(test) {
	checkInterpretedOutput(test, "cast/castDocument.pec");
};

exports.testTranspiledCastDocument = function(test) {
	checkTranspiledOutput(test, "cast/castDocument.pec");
};

exports.testInterpretedCastInteger = function(test) {
	checkInterpretedOutput(test, "cast/castInteger.pec");
};

exports.testTranspiledCastInteger = function(test) {
	checkTranspiledOutput(test, "cast/castInteger.pec");
};

exports.testInterpretedCastMissing = function(test) {
	checkInterpretedOutput(test, "cast/castMissing.pec");
};

exports.testTranspiledCastMissing = function(test) {
	checkTranspiledOutput(test, "cast/castMissing.pec");
};

exports.testInterpretedCastNull = function(test) {
	checkInterpretedOutput(test, "cast/castNull.pec");
};

exports.testTranspiledCastNull = function(test) {
	checkTranspiledOutput(test, "cast/castNull.pec");
};

exports.testInterpretedCastRoot = function(test) {
	checkInterpretedOutput(test, "cast/castRoot.pec");
};

exports.testTranspiledCastRoot = function(test) {
	checkTranspiledOutput(test, "cast/castRoot.pec");
};

exports.testInterpretedIsAChild = function(test) {
	checkInterpretedOutput(test, "cast/isAChild.pec");
};

exports.testTranspiledIsAChild = function(test) {
	checkTranspiledOutput(test, "cast/isAChild.pec");
};

exports.testInterpretedIsAText = function(test) {
	checkInterpretedOutput(test, "cast/isAText.pec");
};

exports.testTranspiledIsAText = function(test) {
	checkTranspiledOutput(test, "cast/isAText.pec");
};

