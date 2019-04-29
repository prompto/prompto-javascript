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

exports.testInterpretedAddAmount = function(test) {
	checkInterpretedOutput(test, "operators/addAmount.pec");
};

exports.testTranspiledAddAmount = function(test) {
	checkTranspiledOutput(test, "operators/addAmount.pec");
};

exports.testInterpretedDivAmount = function(test) {
	checkInterpretedOutput(test, "operators/divAmount.pec");
};

exports.testTranspiledDivAmount = function(test) {
	checkTranspiledOutput(test, "operators/divAmount.pec");
};

exports.testInterpretedIdivAmount = function(test) {
	checkInterpretedOutput(test, "operators/idivAmount.pec");
};

exports.testTranspiledIdivAmount = function(test) {
	checkTranspiledOutput(test, "operators/idivAmount.pec");
};

exports.testInterpretedModAmount = function(test) {
	checkInterpretedOutput(test, "operators/modAmount.pec");
};

exports.testTranspiledModAmount = function(test) {
	checkTranspiledOutput(test, "operators/modAmount.pec");
};

exports.testInterpretedMultAmount = function(test) {
	checkInterpretedOutput(test, "operators/multAmount.pec");
};

exports.testTranspiledMultAmount = function(test) {
	checkTranspiledOutput(test, "operators/multAmount.pec");
};

exports.testInterpretedSubAmount = function(test) {
	checkInterpretedOutput(test, "operators/subAmount.pec");
};

exports.testTranspiledSubAmount = function(test) {
	checkTranspiledOutput(test, "operators/subAmount.pec");
};

