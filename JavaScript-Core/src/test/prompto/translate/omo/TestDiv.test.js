require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testDivDecimal = function(test) {
	compareResourceOMO(test, "div/divDecimal.poc");
};

exports.testDivInteger = function(test) {
	compareResourceOMO(test, "div/divInteger.poc");
};

exports.testIdivInteger = function(test) {
	compareResourceOMO(test, "div/idivInteger.poc");
};

exports.testModInteger = function(test) {
	compareResourceOMO(test, "div/modInteger.poc");
};

