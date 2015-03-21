require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testAddAmount = function(test) {
	compareResourceOPO(test, "operators/addAmount.o");
};

exports.testDivAmount = function(test) {
	compareResourceOPO(test, "operators/divAmount.o");
};

exports.testIdivAmount = function(test) {
	compareResourceOPO(test, "operators/idivAmount.o");
};

exports.testModAmount = function(test) {
	compareResourceOPO(test, "operators/modAmount.o");
};

exports.testMultAmount = function(test) {
	compareResourceOPO(test, "operators/multAmount.o");
};

exports.testSubAmount = function(test) {
	compareResourceOPO(test, "operators/subAmount.o");
};

