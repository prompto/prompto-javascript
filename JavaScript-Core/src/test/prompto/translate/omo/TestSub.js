require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testSubDate = function(test) {
	compareResourceOMO(test, "sub/subDate.poc");
};

exports.testSubDateTime = function(test) {
	compareResourceOMO(test, "sub/subDateTime.poc");
};

exports.testSubDecimal = function(test) {
	compareResourceOMO(test, "sub/subDecimal.poc");
};

exports.testSubInteger = function(test) {
	compareResourceOMO(test, "sub/subInteger.poc");
};

exports.testSubPeriod = function(test) {
	compareResourceOMO(test, "sub/subPeriod.poc");
};

exports.testSubTime = function(test) {
	compareResourceOMO(test, "sub/subTime.poc");
};

