require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testDivDecimal = function(test) {
	compareResourceOSO(test, "div/divDecimal.poc");
};

exports.testDivInteger = function(test) {
	compareResourceOSO(test, "div/divInteger.poc");
};

exports.testIdivInteger = function(test) {
	compareResourceOSO(test, "div/idivInteger.poc");
};

exports.testModInteger = function(test) {
	compareResourceOSO(test, "div/modInteger.poc");
};

