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

exports.testInterpretedDivDecimal = function(test) {
	checkInterpretedOutput(test, "div/divDecimal.poc");
};

exports.testTranspiledDivDecimal = function(test) {
	checkTranspiledOutput(test, "div/divDecimal.poc");
};

exports.testInterpretedDivInteger = function(test) {
	checkInterpretedOutput(test, "div/divInteger.poc");
};

exports.testTranspiledDivInteger = function(test) {
	checkTranspiledOutput(test, "div/divInteger.poc");
};

exports.testInterpretedIdivInteger = function(test) {
	checkInterpretedOutput(test, "div/idivInteger.poc");
};

exports.testTranspiledIdivInteger = function(test) {
	checkTranspiledOutput(test, "div/idivInteger.poc");
};

exports.testInterpretedModInteger = function(test) {
	checkInterpretedOutput(test, "div/modInteger.poc");
};

exports.testTranspiledModInteger = function(test) {
	checkTranspiledOutput(test, "div/modInteger.poc");
};

