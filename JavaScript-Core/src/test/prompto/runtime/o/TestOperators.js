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

exports.testInterpretedAddAmount = function(test) {
	checkInterpretedOutput(test, "operators/addAmount.poc");
};

exports.testTranspiledAddAmount = function(test) {
	checkTranspiledOutput(test, "operators/addAmount.poc");
};

exports.testInterpretedDivAmount = function(test) {
	checkInterpretedOutput(test, "operators/divAmount.poc");
};

exports.testTranspiledDivAmount = function(test) {
	checkTranspiledOutput(test, "operators/divAmount.poc");
};

exports.testInterpretedIdivAmount = function(test) {
	checkInterpretedOutput(test, "operators/idivAmount.poc");
};

exports.testTranspiledIdivAmount = function(test) {
	checkTranspiledOutput(test, "operators/idivAmount.poc");
};

exports.testInterpretedModAmount = function(test) {
	checkInterpretedOutput(test, "operators/modAmount.poc");
};

exports.testTranspiledModAmount = function(test) {
	checkTranspiledOutput(test, "operators/modAmount.poc");
};

exports.testInterpretedMultAmount = function(test) {
	checkInterpretedOutput(test, "operators/multAmount.poc");
};

exports.testTranspiledMultAmount = function(test) {
	checkTranspiledOutput(test, "operators/multAmount.poc");
};

exports.testInterpretedSubAmount = function(test) {
	checkInterpretedOutput(test, "operators/subAmount.poc");
};

exports.testTranspiledSubAmount = function(test) {
	checkTranspiledOutput(test, "operators/subAmount.poc");
};

