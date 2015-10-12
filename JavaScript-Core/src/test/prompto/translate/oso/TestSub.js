require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testSubDate = function(test) {
	compareResourceOSO(test, "sub/subDate.poc");
};

exports.testSubDateTime = function(test) {
	compareResourceOSO(test, "sub/subDateTime.poc");
};

exports.testSubDecimal = function(test) {
	compareResourceOSO(test, "sub/subDecimal.poc");
};

exports.testSubInteger = function(test) {
	compareResourceOSO(test, "sub/subInteger.poc");
};

exports.testSubPeriod = function(test) {
	compareResourceOSO(test, "sub/subPeriod.poc");
};

exports.testSubTime = function(test) {
	compareResourceOSO(test, "sub/subTime.poc");
};

