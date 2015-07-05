// generated: 2015-07-05T23:01:02.153
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

exports.testAddAmount = function(test) {
	checkOutput(test, "operators/addAmount.poc");
};

exports.testDivAmount = function(test) {
	checkOutput(test, "operators/divAmount.poc");
};

exports.testIdivAmount = function(test) {
	checkOutput(test, "operators/idivAmount.poc");
};

exports.testModAmount = function(test) {
	checkOutput(test, "operators/modAmount.poc");
};

exports.testMultAmount = function(test) {
	checkOutput(test, "operators/multAmount.poc");
};

exports.testSubAmount = function(test) {
	checkOutput(test, "operators/subAmount.poc");
};

