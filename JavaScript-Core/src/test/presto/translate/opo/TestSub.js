require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testSubDate = function(test) {
	compareResourceOPO(test, "sub/subDate.o");
};

exports.testSubDateTime = function(test) {
	compareResourceOPO(test, "sub/subDateTime.o");
};

exports.testSubDecimal = function(test) {
	compareResourceOPO(test, "sub/subDecimal.o");
};

exports.testSubInteger = function(test) {
	compareResourceOPO(test, "sub/subInteger.o");
};

exports.testSubPeriod = function(test) {
	compareResourceOPO(test, "sub/subPeriod.o");
};

exports.testSubTime = function(test) {
	compareResourceOPO(test, "sub/subTime.o");
};

