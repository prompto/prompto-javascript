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

exports.testInterpretedSelfAsParameter = function(test) {
	checkInterpretedOutput(test, "self/selfAsParameter.poc");
};

exports.testTranspiledSelfAsParameter = function(test) {
	checkTranspiledOutput(test, "self/selfAsParameter.poc");
};

exports.testInterpretedSelfMember = function(test) {
	checkInterpretedOutput(test, "self/selfMember.poc");
};

exports.testTranspiledSelfMember = function(test) {
	checkTranspiledOutput(test, "self/selfMember.poc");
};

