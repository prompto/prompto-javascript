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

exports.testInterpretedExpressionInjection = function(test) {
	checkInterpretedOutput(test, "injections/expressionInjection.poc");
};

exports.testTranspiledExpressionInjection = function(test) {
	checkTranspiledOutput(test, "injections/expressionInjection.poc");
};

