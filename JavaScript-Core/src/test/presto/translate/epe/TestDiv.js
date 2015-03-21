require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testDivDecimal = function(test) {
	compareResourceEPE(test, "div/divDecimal.e");
};

exports.testDivInteger = function(test) {
	compareResourceEPE(test, "div/divInteger.e");
};

exports.testIdivInteger = function(test) {
	compareResourceEPE(test, "div/idivInteger.e");
};

exports.testModInteger = function(test) {
	compareResourceEPE(test, "div/modInteger.e");
};

