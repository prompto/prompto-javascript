require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedMemberAttribute = function(test) {
	checkInterpretedOutput(test, "member/memberAttribute.pmc");
};

exports.testTranspiledMemberAttribute = function(test) {
	checkTranspiledOutput(test, "member/memberAttribute.pmc");
};

