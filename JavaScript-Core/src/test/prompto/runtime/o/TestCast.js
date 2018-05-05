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

exports.testInterpretedAutoDowncast = function(test) {
	checkInterpretedOutput(test, "cast/autoDowncast.poc");
};

exports.testTranspiledAutoDowncast = function(test) {
	checkTranspiledOutput(test, "cast/autoDowncast.poc");
};

exports.testInterpretedCastChild = function(test) {
	checkInterpretedOutput(test, "cast/castChild.poc");
};

exports.testTranspiledCastChild = function(test) {
	checkTranspiledOutput(test, "cast/castChild.poc");
};

exports.testInterpretedCastMissing = function(test) {
	checkInterpretedOutput(test, "cast/castMissing.poc");
};

exports.testTranspiledCastMissing = function(test) {
	checkTranspiledOutput(test, "cast/castMissing.poc");
};

exports.testInterpretedCastNull = function(test) {
	checkInterpretedOutput(test, "cast/castNull.poc");
};

exports.testTranspiledCastNull = function(test) {
	checkTranspiledOutput(test, "cast/castNull.poc");
};

exports.testInterpretedIsAChild = function(test) {
	checkInterpretedOutput(test, "cast/isAChild.poc");
};

exports.testTranspiledIsAChild = function(test) {
	checkTranspiledOutput(test, "cast/isAChild.poc");
};

exports.testInterpretedIsAText = function(test) {
	checkInterpretedOutput(test, "cast/isAText.poc");
};

exports.testTranspiledIsAText = function(test) {
	checkTranspiledOutput(test, "cast/isAText.poc");
};

