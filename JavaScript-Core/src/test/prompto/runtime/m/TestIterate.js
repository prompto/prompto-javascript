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

exports.testInterpretedForEachExpression = function(test) {
	checkInterpretedOutput(test, "iterate/forEachExpression.pmc");
};

exports.testTranspiledForEachExpression = function(test) {
	checkTranspiledOutput(test, "iterate/forEachExpression.pmc");
};

