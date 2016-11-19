require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testDivDecimal = function(test) {
	compareResourceEME(test, "div/divDecimal.pec");
};

exports.testDivInteger = function(test) {
	compareResourceEME(test, "div/divInteger.pec");
};

exports.testIdivInteger = function(test) {
	compareResourceEME(test, "div/idivInteger.pec");
};

exports.testModInteger = function(test) {
	compareResourceEME(test, "div/modInteger.pec");
};

