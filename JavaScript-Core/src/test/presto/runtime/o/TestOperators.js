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
	checkOutput(test, "operators/addAmount.o");
};

exports.testDivAmount = function(test) {
	checkOutput(test, "operators/divAmount.o");
};

exports.testIdivAmount = function(test) {
	checkOutput(test, "operators/idivAmount.o");
};

exports.testModAmount = function(test) {
	checkOutput(test, "operators/modAmount.o");
};

exports.testMultAmount = function(test) {
	checkOutput(test, "operators/multAmount.o");
};

exports.testSubAmount = function(test) {
	checkOutput(test, "operators/subAmount.o");
};

