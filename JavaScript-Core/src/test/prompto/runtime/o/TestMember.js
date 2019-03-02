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

exports.testInterpretedMemberAttribute = function(test) {
	checkInterpretedOutput(test, "member/memberAttribute.poc");
};

exports.testTranspiledMemberAttribute = function(test) {
	checkTranspiledOutput(test, "member/memberAttribute.poc");
};

