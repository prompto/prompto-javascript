require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testAddAmount = function(test) {
	compareResourceEPE(test, "operators/addAmount.e");
};

exports.testDivAmount = function(test) {
	compareResourceEPE(test, "operators/divAmount.e");
};

exports.testIdivAmount = function(test) {
	compareResourceEPE(test, "operators/idivAmount.e");
};

exports.testModAmount = function(test) {
	compareResourceEPE(test, "operators/modAmount.e");
};

exports.testMultAmount = function(test) {
	compareResourceEPE(test, "operators/multAmount.e");
};

exports.testSubAmount = function(test) {
	compareResourceEPE(test, "operators/subAmount.e");
};

