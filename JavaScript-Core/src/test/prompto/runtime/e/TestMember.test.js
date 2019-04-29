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

exports.testInterpretedMemberAttribute = function(test) {
	checkInterpretedOutput(test, "member/memberAttribute.pec");
};

exports.testTranspiledMemberAttribute = function(test) {
	checkTranspiledOutput(test, "member/memberAttribute.pec");
};

