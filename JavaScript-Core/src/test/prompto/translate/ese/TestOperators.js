require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testAddAmount = function(test) {
	compareResourceESE(test, "operators/addAmount.pec");
};

exports.testDivAmount = function(test) {
	compareResourceESE(test, "operators/divAmount.pec");
};

exports.testIdivAmount = function(test) {
	compareResourceESE(test, "operators/idivAmount.pec");
};

exports.testModAmount = function(test) {
	compareResourceESE(test, "operators/modAmount.pec");
};

exports.testMultAmount = function(test) {
	compareResourceESE(test, "operators/multAmount.pec");
};

exports.testSubAmount = function(test) {
	compareResourceESE(test, "operators/subAmount.pec");
};

