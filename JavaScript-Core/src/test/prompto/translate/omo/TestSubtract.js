require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testSubDate = function(test) {
	compareResourceOMO(test, "subtract/subDate.poc");
};

exports.testSubDateTime = function(test) {
	compareResourceOMO(test, "subtract/subDateTime.poc");
};

exports.testSubDecimal = function(test) {
	compareResourceOMO(test, "subtract/subDecimal.poc");
};

exports.testSubInteger = function(test) {
	compareResourceOMO(test, "subtract/subInteger.poc");
};

exports.testSubList = function(test) {
	compareResourceOMO(test, "subtract/subList.poc");
};

exports.testSubPeriod = function(test) {
	compareResourceOMO(test, "subtract/subPeriod.poc");
};

exports.testSubSet = function(test) {
	compareResourceOMO(test, "subtract/subSet.poc");
};

exports.testSubTime = function(test) {
	compareResourceOMO(test, "subtract/subTime.poc");
};

