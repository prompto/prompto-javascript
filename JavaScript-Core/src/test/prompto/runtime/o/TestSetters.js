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

exports.testInterpretedGetter = function(test) {
	checkInterpretedOutput(test, "setters/getter.poc");
};

exports.testTranspiledGetter = function(test) {
	checkTranspiledOutput(test, "setters/getter.poc");
};

exports.testInterpretedSetter = function(test) {
	checkInterpretedOutput(test, "setters/setter.poc");
};

exports.testTranspiledSetter = function(test) {
	checkTranspiledOutput(test, "setters/setter.poc");
};

