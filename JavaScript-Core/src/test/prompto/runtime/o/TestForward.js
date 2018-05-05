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

exports.testInterpretedForward = function(test) {
	checkInterpretedOutput(test, "forward/forward.poc");
};

exports.testTranspiledForward = function(test) {
	checkTranspiledOutput(test, "forward/forward.poc");
};

