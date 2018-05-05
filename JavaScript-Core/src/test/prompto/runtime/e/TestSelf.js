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

exports.testInterpretedSelfAsParameter = function(test) {
	checkInterpretedOutput(test, "self/selfAsParameter.pec");
};

exports.testTranspiledSelfAsParameter = function(test) {
	checkTranspiledOutput(test, "self/selfAsParameter.pec");
};

exports.testInterpretedSelfMember = function(test) {
	checkInterpretedOutput(test, "self/selfMember.pec");
};

exports.testTranspiledSelfMember = function(test) {
	checkTranspiledOutput(test, "self/selfMember.pec");
};

