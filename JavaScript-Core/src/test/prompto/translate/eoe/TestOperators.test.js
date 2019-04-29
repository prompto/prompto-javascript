require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAddAmount = function(test) {
	compareResourceEOE(test, "operators/addAmount.pec");
};

exports.testDivAmount = function(test) {
	compareResourceEOE(test, "operators/divAmount.pec");
};

exports.testIdivAmount = function(test) {
	compareResourceEOE(test, "operators/idivAmount.pec");
};

exports.testModAmount = function(test) {
	compareResourceEOE(test, "operators/modAmount.pec");
};

exports.testMultAmount = function(test) {
	compareResourceEOE(test, "operators/multAmount.pec");
};

exports.testSubAmount = function(test) {
	compareResourceEOE(test, "operators/subAmount.pec");
};

