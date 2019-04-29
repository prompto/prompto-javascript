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

exports.testInterpretedDeepItem = function(test) {
	checkInterpretedOutput(test, "documents/deepItem.poc");
};

exports.testTranspiledDeepItem = function(test) {
	checkTranspiledOutput(test, "documents/deepItem.poc");
};

exports.testInterpretedDeepMember = function(test) {
	checkInterpretedOutput(test, "documents/deepMember.poc");
};

exports.testTranspiledDeepMember = function(test) {
	checkTranspiledOutput(test, "documents/deepMember.poc");
};

exports.testInterpretedItem = function(test) {
	checkInterpretedOutput(test, "documents/item.poc");
};

exports.testTranspiledItem = function(test) {
	checkTranspiledOutput(test, "documents/item.poc");
};

exports.testInterpretedLiteral = function(test) {
	checkInterpretedOutput(test, "documents/literal.poc");
};

exports.testTranspiledLiteral = function(test) {
	checkTranspiledOutput(test, "documents/literal.poc");
};

exports.testInterpretedMember = function(test) {
	checkInterpretedOutput(test, "documents/member.poc");
};

exports.testTranspiledMember = function(test) {
	checkTranspiledOutput(test, "documents/member.poc");
};

