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

exports.testInterpretedExpressionInjection = function(test) {
	checkInterpretedOutput(test, "injections/expressionInjection.pec");
};

exports.testTranspiledExpressionInjection = function(test) {
	checkTranspiledOutput(test, "injections/expressionInjection.pec");
};

