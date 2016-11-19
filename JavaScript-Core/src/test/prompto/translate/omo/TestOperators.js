require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testAddAmount = function(test) {
	compareResourceOMO(test, "operators/addAmount.poc");
};

exports.testDivAmount = function(test) {
	compareResourceOMO(test, "operators/divAmount.poc");
};

exports.testIdivAmount = function(test) {
	compareResourceOMO(test, "operators/idivAmount.poc");
};

exports.testModAmount = function(test) {
	compareResourceOMO(test, "operators/modAmount.poc");
};

exports.testMultAmount = function(test) {
	compareResourceOMO(test, "operators/multAmount.poc");
};

exports.testSubAmount = function(test) {
	compareResourceOMO(test, "operators/subAmount.poc");
};

