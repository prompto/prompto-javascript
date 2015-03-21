require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSubDate = function(test) {
	compareResourceOEO(test, "sub/subDate.o");
};

exports.testSubDateTime = function(test) {
	compareResourceOEO(test, "sub/subDateTime.o");
};

exports.testSubDecimal = function(test) {
	compareResourceOEO(test, "sub/subDecimal.o");
};

exports.testSubInteger = function(test) {
	compareResourceOEO(test, "sub/subInteger.o");
};

exports.testSubPeriod = function(test) {
	compareResourceOEO(test, "sub/subPeriod.o");
};

exports.testSubTime = function(test) {
	compareResourceOEO(test, "sub/subTime.o");
};

