require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSubDate = function(test) {
	compareResourceEOE(test, "sub/subDate.e");
};

exports.testSubDateTime = function(test) {
	compareResourceEOE(test, "sub/subDateTime.e");
};

exports.testSubDecimal = function(test) {
	compareResourceEOE(test, "sub/subDecimal.e");
};

exports.testSubInteger = function(test) {
	compareResourceEOE(test, "sub/subInteger.e");
};

exports.testSubPeriod = function(test) {
	compareResourceEOE(test, "sub/subPeriod.e");
};

exports.testSubTime = function(test) {
	compareResourceEOE(test, "sub/subTime.e");
};

