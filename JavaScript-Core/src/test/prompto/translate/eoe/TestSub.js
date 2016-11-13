require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSubDate = function(test) {
	compareResourceEOE(test, "sub/subDate.pec");
};

exports.testSubDateTime = function(test) {
	compareResourceEOE(test, "sub/subDateTime.pec");
};

exports.testSubDecimal = function(test) {
	compareResourceEOE(test, "sub/subDecimal.pec");
};

exports.testSubDecimalEnum = function(test) {
	compareResourceEOE(test, "sub/subDecimalEnum.pec");
};

exports.testSubInteger = function(test) {
	compareResourceEOE(test, "sub/subInteger.pec");
};

exports.testSubIntegerEnum = function(test) {
	compareResourceEOE(test, "sub/subIntegerEnum.pec");
};

exports.testSubPeriod = function(test) {
	compareResourceEOE(test, "sub/subPeriod.pec");
};

exports.testSubTime = function(test) {
	compareResourceEOE(test, "sub/subTime.pec");
};

