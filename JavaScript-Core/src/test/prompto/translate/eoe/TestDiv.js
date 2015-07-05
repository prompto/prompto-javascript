// generated: 2015-07-05T23:01:02.028
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDivDecimal = function(test) {
	compareResourceEOE(test, "div/divDecimal.pec");
};

exports.testDivInteger = function(test) {
	compareResourceEOE(test, "div/divInteger.pec");
};

exports.testIdivInteger = function(test) {
	compareResourceEOE(test, "div/idivInteger.pec");
};

exports.testModInteger = function(test) {
	compareResourceEOE(test, "div/modInteger.pec");
};

