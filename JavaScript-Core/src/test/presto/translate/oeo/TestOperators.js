require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testAddAmount = function(test) {
	compareResourceOEO(test, "operators/addAmount.o");
};

exports.testDivAmount = function(test) {
	compareResourceOEO(test, "operators/divAmount.o");
};

exports.testIdivAmount = function(test) {
	compareResourceOEO(test, "operators/idivAmount.o");
};

exports.testModAmount = function(test) {
	compareResourceOEO(test, "operators/modAmount.o");
};

exports.testMultAmount = function(test) {
	compareResourceOEO(test, "operators/multAmount.o");
};

exports.testSubAmount = function(test) {
	compareResourceOEO(test, "operators/subAmount.o");
};

