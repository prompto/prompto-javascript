require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDivDecimal = function(test) {
	compareResourceEOE(test, "div/divDecimal.e");
};

exports.testDivInteger = function(test) {
	compareResourceEOE(test, "div/divInteger.e");
};

exports.testIdivInteger = function(test) {
	compareResourceEOE(test, "div/idivInteger.e");
};

exports.testModInteger = function(test) {
	compareResourceEOE(test, "div/modInteger.e");
};

