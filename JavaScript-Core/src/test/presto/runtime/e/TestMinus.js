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
	checkOutput(test, "minus/minusDecimal.pec");
};

exports.testMinusInteger = function(test) {
	checkOutput(test, "minus/minusInteger.pec");
};

exports.testMinusPeriod = function(test) {
	checkOutput(test, "minus/minusPeriod.pec");
};

