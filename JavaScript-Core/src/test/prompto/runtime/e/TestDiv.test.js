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

exports.testInterpretedDivDecimal = function(test) {
	checkInterpretedOutput(test, "div/divDecimal.pec");
};

exports.testTranspiledDivDecimal = function(test) {
	checkTranspiledOutput(test, "div/divDecimal.pec");
};

exports.testInterpretedDivInteger = function(test) {
	checkInterpretedOutput(test, "div/divInteger.pec");
};

exports.testTranspiledDivInteger = function(test) {
	checkTranspiledOutput(test, "div/divInteger.pec");
};

exports.testInterpretedIdivInteger = function(test) {
	checkInterpretedOutput(test, "div/idivInteger.pec");
};

exports.testTranspiledIdivInteger = function(test) {
	checkTranspiledOutput(test, "div/idivInteger.pec");
};

exports.testInterpretedModInteger = function(test) {
	checkInterpretedOutput(test, "div/modInteger.pec");
};

exports.testTranspiledModInteger = function(test) {
	checkTranspiledOutput(test, "div/modInteger.pec");
};

