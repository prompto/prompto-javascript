require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testMinusDecimal = function(test) {
	checkOutput(test, "minus/minusDecimal.e");
};

exports.testMinusInteger = function(test) {
	checkOutput(test, "minus/minusInteger.e");
};

exports.testMinusPeriod = function(test) {
	checkOutput(test, "minus/minusPeriod.e");
};

