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

exports.testInterpretedAttribute = function(test) {
	checkInterpretedOutput(test, "singleton/attribute.poc");
};

exports.testTranspiledAttribute = function(test) {
	checkTranspiledOutput(test, "singleton/attribute.poc");
};

exports.testInterpretedMember = function(test) {
	checkInterpretedOutput(test, "singleton/member.poc");
};

exports.testTranspiledMember = function(test) {
	checkTranspiledOutput(test, "singleton/member.poc");
};

