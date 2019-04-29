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

exports.testInterpretedAndBoolean = function(test) {
	checkInterpretedOutput(test, "logic/andBoolean.poc");
};

exports.testTranspiledAndBoolean = function(test) {
	checkTranspiledOutput(test, "logic/andBoolean.poc");
};

exports.testInterpretedNotBoolean = function(test) {
	checkInterpretedOutput(test, "logic/notBoolean.poc");
};

exports.testTranspiledNotBoolean = function(test) {
	checkTranspiledOutput(test, "logic/notBoolean.poc");
};

exports.testInterpretedOrBoolean = function(test) {
	checkInterpretedOutput(test, "logic/orBoolean.poc");
};

exports.testTranspiledOrBoolean = function(test) {
	checkTranspiledOutput(test, "logic/orBoolean.poc");
};

