require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testDivDecimal = function(test) {
	compareResourceESE(test, "div/divDecimal.pec");
};

exports.testDivInteger = function(test) {
	compareResourceESE(test, "div/divInteger.pec");
};

exports.testIdivInteger = function(test) {
	compareResourceESE(test, "div/idivInteger.pec");
};

exports.testModInteger = function(test) {
	compareResourceESE(test, "div/modInteger.pec");
};

