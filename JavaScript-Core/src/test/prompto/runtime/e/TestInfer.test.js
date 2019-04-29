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

exports.testInterpretedInferDict = function(test) {
	checkInterpretedOutput(test, "infer/inferDict.pec");
};

exports.testTranspiledInferDict = function(test) {
	checkTranspiledOutput(test, "infer/inferDict.pec");
};

exports.testInterpretedInferList = function(test) {
	checkInterpretedOutput(test, "infer/inferList.pec");
};

exports.testTranspiledInferList = function(test) {
	checkTranspiledOutput(test, "infer/inferList.pec");
};

exports.testInterpretedInferSet = function(test) {
	checkInterpretedOutput(test, "infer/inferSet.pec");
};

exports.testTranspiledInferSet = function(test) {
	checkTranspiledOutput(test, "infer/inferSet.pec");
};

