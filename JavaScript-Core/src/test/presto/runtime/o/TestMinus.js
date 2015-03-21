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
	checkOutput(test, "minus/minusDecimal.o");
};

exports.testMinusInteger = function(test) {
	checkOutput(test, "minus/minusInteger.o");
};

exports.testMinusPeriod = function(test) {
	checkOutput(test, "minus/minusPeriod.o");
};

