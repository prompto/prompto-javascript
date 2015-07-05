// generated: 2015-07-05T23:01:02.084
require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testExpressionInjection = function(test) {
	checkOutput(test, "injections/expressionInjection.poc");
};

