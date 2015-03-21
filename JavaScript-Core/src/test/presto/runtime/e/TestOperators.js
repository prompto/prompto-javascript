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
	checkOutput(test, "operators/addAmount.e");
};

exports.testDivAmount = function(test) {
	checkOutput(test, "operators/divAmount.e");
};

exports.testIdivAmount = function(test) {
	checkOutput(test, "operators/idivAmount.e");
};

exports.testModAmount = function(test) {
	checkOutput(test, "operators/modAmount.e");
};

exports.testMultAmount = function(test) {
	checkOutput(test, "operators/multAmount.e");
};

exports.testSubAmount = function(test) {
	checkOutput(test, "operators/subAmount.e");
};

