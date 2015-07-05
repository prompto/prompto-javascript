// generated: 2015-07-05T23:01:02.128
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

exports.testMinusDecimal = function(test) {
	checkOutput(test, "minus/minusDecimal.poc");
};

exports.testMinusInteger = function(test) {
	checkOutput(test, "minus/minusInteger.poc");
};

exports.testMinusPeriod = function(test) {
	checkOutput(test, "minus/minusPeriod.poc");
};

