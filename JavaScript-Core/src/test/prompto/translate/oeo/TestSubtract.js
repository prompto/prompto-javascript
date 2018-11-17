require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSubDate = function(test) {
	compareResourceOEO(test, "subtract/subDate.poc");
};

exports.testSubDateTime = function(test) {
	compareResourceOEO(test, "subtract/subDateTime.poc");
};

exports.testSubDecimal = function(test) {
	compareResourceOEO(test, "subtract/subDecimal.poc");
};

exports.testSubInteger = function(test) {
	compareResourceOEO(test, "subtract/subInteger.poc");
};

exports.testSubList = function(test) {
	compareResourceOEO(test, "subtract/subList.poc");
};

exports.testSubPeriod = function(test) {
	compareResourceOEO(test, "subtract/subPeriod.poc");
};

exports.testSubSet = function(test) {
	compareResourceOEO(test, "subtract/subSet.poc");
};

exports.testSubTime = function(test) {
	compareResourceOEO(test, "subtract/subTime.poc");
};

