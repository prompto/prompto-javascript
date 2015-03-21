require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDivDecimal = function(test) {
	compareResourceOEO(test, "div/divDecimal.o");
};

exports.testDivInteger = function(test) {
	compareResourceOEO(test, "div/divInteger.o");
};

exports.testIdivInteger = function(test) {
	compareResourceOEO(test, "div/idivInteger.o");
};

exports.testModInteger = function(test) {
	compareResourceOEO(test, "div/modInteger.o");
};

