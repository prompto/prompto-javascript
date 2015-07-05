// generated: 2015-07-05T23:01:02.150
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

exports.testAddAmount = function(test) {
	checkOutput(test, "operators/addAmount.pec");
};

exports.testDivAmount = function(test) {
	checkOutput(test, "operators/divAmount.pec");
};

exports.testIdivAmount = function(test) {
	checkOutput(test, "operators/idivAmount.pec");
};

exports.testModAmount = function(test) {
	checkOutput(test, "operators/modAmount.pec");
};

exports.testMultAmount = function(test) {
	checkOutput(test, "operators/multAmount.pec");
};

exports.testSubAmount = function(test) {
	checkOutput(test, "operators/subAmount.pec");
};

