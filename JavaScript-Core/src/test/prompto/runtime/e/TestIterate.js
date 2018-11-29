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

exports.testInterpretedForEachCategoryList = function(test) {
	checkInterpretedOutput(test, "iterate/forEachCategoryList.pec");
};

exports.testTranspiledForEachCategoryList = function(test) {
	checkTranspiledOutput(test, "iterate/forEachCategoryList.pec");
};

exports.testInterpretedForEachExpression = function(test) {
	checkInterpretedOutput(test, "iterate/forEachExpression.pec");
};

exports.testTranspiledForEachExpression = function(test) {
	checkTranspiledOutput(test, "iterate/forEachExpression.pec");
};

exports.testInterpretedForEachIntegerList = function(test) {
	checkInterpretedOutput(test, "iterate/forEachIntegerList.pec");
};

exports.testTranspiledForEachIntegerList = function(test) {
	checkTranspiledOutput(test, "iterate/forEachIntegerList.pec");
};

