require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testDivDecimal = function(test) {
	compareResourceOPO(test, "div/divDecimal.o");
};

exports.testDivInteger = function(test) {
	compareResourceOPO(test, "div/divInteger.o");
};

exports.testIdivInteger = function(test) {
	compareResourceOPO(test, "div/idivInteger.o");
};

exports.testModInteger = function(test) {
	compareResourceOPO(test, "div/modInteger.o");
};

