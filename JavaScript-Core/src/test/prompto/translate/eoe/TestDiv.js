require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDivDecimal = function(test) {
	compareResourceEOE(test, "div/divDecimal.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testDivInteger = function(test) {
	compareResourceEOE(test, "div/divInteger.pec");
};

exports.testIdivInteger = function(test) {
	compareResourceEOE(test, "div/idivInteger.pec");
};

exports.testModInteger = function(test) {
	compareResourceEOE(test, "div/modInteger.pec");
};

