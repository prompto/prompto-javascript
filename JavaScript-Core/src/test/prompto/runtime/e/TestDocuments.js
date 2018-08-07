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

exports.testInterpretedBlob = function(test) {
	checkInterpretedOutput(test, "documents/blob.pec");
};

exports.testTranspiledBlob = function(test) {
	checkTranspiledOutput(test, "documents/blob.pec");
};

exports.testInterpretedDeepItem = function(test) {
	checkInterpretedOutput(test, "documents/deepItem.pec");
};

exports.testTranspiledDeepItem = function(test) {
	checkTranspiledOutput(test, "documents/deepItem.pec");
};

exports.testInterpretedDeepMember = function(test) {
	checkInterpretedOutput(test, "documents/deepMember.pec");
};

exports.testTranspiledDeepMember = function(test) {
	checkTranspiledOutput(test, "documents/deepMember.pec");
};

exports.testInterpretedItem = function(test) {
	checkInterpretedOutput(test, "documents/item.pec");
};

exports.testTranspiledItem = function(test) {
	checkTranspiledOutput(test, "documents/item.pec");
};

exports.testInterpretedLiteral = function(test) {
	checkInterpretedOutput(test, "documents/literal.pec");
};

exports.testTranspiledLiteral = function(test) {
	checkTranspiledOutput(test, "documents/literal.pec");
};

exports.testInterpretedMember = function(test) {
	checkInterpretedOutput(test, "documents/member.pec");
};

exports.testTranspiledMember = function(test) {
	checkTranspiledOutput(test, "documents/member.pec");
};

exports.testInterpretedNamedItem = function(test) {
	checkInterpretedOutput(test, "documents/namedItem.pec");
};

exports.testTranspiledNamedItem = function(test) {
	checkTranspiledOutput(test, "documents/namedItem.pec");
};

