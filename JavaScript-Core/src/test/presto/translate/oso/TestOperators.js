require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testAddAmount = function(test) {
	compareResourceOSO(test, "operators/addAmount.poc");
};

exports.testDivAmount = function(test) {
	compareResourceOSO(test, "operators/divAmount.poc");
};

exports.testIdivAmount = function(test) {
	compareResourceOSO(test, "operators/idivAmount.poc");
};

exports.testModAmount = function(test) {
	compareResourceOSO(test, "operators/modAmount.poc");
};

exports.testMultAmount = function(test) {
	compareResourceOSO(test, "operators/multAmount.poc");
};

exports.testSubAmount = function(test) {
	compareResourceOSO(test, "operators/subAmount.poc");
};

