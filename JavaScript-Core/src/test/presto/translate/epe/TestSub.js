require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testSubDate = function(test) {
	compareResourceEPE(test, "sub/subDate.e");
};

exports.testSubDateTime = function(test) {
	compareResourceEPE(test, "sub/subDateTime.e");
};

exports.testSubDecimal = function(test) {
	compareResourceEPE(test, "sub/subDecimal.e");
};

exports.testSubInteger = function(test) {
	compareResourceEPE(test, "sub/subInteger.e");
};

exports.testSubPeriod = function(test) {
	compareResourceEPE(test, "sub/subPeriod.e");
};

exports.testSubTime = function(test) {
	compareResourceEPE(test, "sub/subTime.e");
};

