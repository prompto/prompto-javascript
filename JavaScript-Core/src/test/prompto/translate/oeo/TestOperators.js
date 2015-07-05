// generated: 2015-07-05T23:01:02.151
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAddAmount = function(test) {
	compareResourceOEO(test, "operators/addAmount.poc");
};

exports.testDivAmount = function(test) {
	compareResourceOEO(test, "operators/divAmount.poc");
};

exports.testIdivAmount = function(test) {
	compareResourceOEO(test, "operators/idivAmount.poc");
};

exports.testModAmount = function(test) {
	compareResourceOEO(test, "operators/modAmount.poc");
};

exports.testMultAmount = function(test) {
	compareResourceOEO(test, "operators/multAmount.poc");
};

exports.testSubAmount = function(test) {
	compareResourceOEO(test, "operators/subAmount.poc");
};

