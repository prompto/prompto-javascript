require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAddAmount = function(test) {
	compareResourceEOE(test, "operators/addAmount.e");
};

exports.testDivAmount = function(test) {
	compareResourceEOE(test, "operators/divAmount.e");
};

exports.testIdivAmount = function(test) {
	compareResourceEOE(test, "operators/idivAmount.e");
};

exports.testModAmount = function(test) {
	compareResourceEOE(test, "operators/modAmount.e");
};

exports.testMultAmount = function(test) {
	compareResourceEOE(test, "operators/multAmount.e");
};

exports.testSubAmount = function(test) {
	compareResourceEOE(test, "operators/subAmount.e");
};

