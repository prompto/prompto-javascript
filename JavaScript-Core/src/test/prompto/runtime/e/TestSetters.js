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

exports.testInterpretedGetter = function(test) {
	checkInterpretedOutput(test, "setters/getter.pec");
};

exports.testTranspiledGetter = function(test) {
	checkTranspiledOutput(test, "setters/getter.pec");
};

exports.testInterpretedGetterCall = function(test) {
	checkInterpretedOutput(test, "setters/getterCall.pec");
};

exports.testTranspiledGetterCall = function(test) {
	checkTranspiledOutput(test, "setters/getterCall.pec");
};

exports.testInterpretedSetter = function(test) {
	checkInterpretedOutput(test, "setters/setter.pec");
};

exports.testTranspiledSetter = function(test) {
	checkTranspiledOutput(test, "setters/setter.pec");
};

