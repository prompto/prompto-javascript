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

exports.testInterpretedForward = function(test) {
	checkInterpretedOutput(test, "forward/forward.pec");
};

exports.testTranspiledForward = function(test) {
	checkTranspiledOutput(test, "forward/forward.pec");
};

