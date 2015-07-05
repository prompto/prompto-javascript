// generated: 2015-07-05T23:01:02.212
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSubDate = function(test) {
	compareResourceOEO(test, "sub/subDate.poc");
};

exports.testSubDateTime = function(test) {
	compareResourceOEO(test, "sub/subDateTime.poc");
};

exports.testSubDecimal = function(test) {
	compareResourceOEO(test, "sub/subDecimal.poc");
};

exports.testSubInteger = function(test) {
	compareResourceOEO(test, "sub/subInteger.poc");
};

exports.testSubPeriod = function(test) {
	compareResourceOEO(test, "sub/subPeriod.poc");
};

exports.testSubTime = function(test) {
	compareResourceOEO(test, "sub/subTime.poc");
};

