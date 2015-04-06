require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDivDecimal = function(test) {
	compareResourceOEO(test, "div/divDecimal.poc");
};

exports.testDivInteger = function(test) {
	compareResourceOEO(test, "div/divInteger.poc");
};

exports.testIdivInteger = function(test) {
	compareResourceOEO(test, "div/idivInteger.poc");
};

exports.testModInteger = function(test) {
	compareResourceOEO(test, "div/modInteger.poc");
};

