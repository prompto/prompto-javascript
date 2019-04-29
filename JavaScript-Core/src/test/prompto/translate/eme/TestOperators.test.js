require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAddAmount = function(test) {
	compareResourceEME(test, "operators/addAmount.pec");
};

exports.testDivAmount = function(test) {
	compareResourceEME(test, "operators/divAmount.pec");
};

exports.testIdivAmount = function(test) {
	compareResourceEME(test, "operators/idivAmount.pec");
};

exports.testModAmount = function(test) {
	compareResourceEME(test, "operators/modAmount.pec");
};

exports.testMultAmount = function(test) {
	compareResourceEME(test, "operators/multAmount.pec");
};

exports.testSubAmount = function(test) {
	compareResourceEME(test, "operators/subAmount.pec");
};

