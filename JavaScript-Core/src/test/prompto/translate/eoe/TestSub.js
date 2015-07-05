// generated: 2015-07-05T23:01:02.208
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

exports.testSubInteger = function(test) {
	compareResourceEOE(test, "sub/subInteger.pec");
};

exports.testSubPeriod = function(test) {
	compareResourceEOE(test, "sub/subPeriod.pec");
};

exports.testSubTime = function(test) {
	compareResourceEOE(test, "sub/subTime.pec");
};

