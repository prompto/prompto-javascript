// generated: 2015-07-05T23:01:02.210
require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testSubDate = function(test) {
	compareResourceESE(test, "sub/subDate.pec");
};

exports.testSubDateTime = function(test) {
	compareResourceESE(test, "sub/subDateTime.pec");
};

exports.testSubDecimal = function(test) {
	compareResourceESE(test, "sub/subDecimal.pec");
};

exports.testSubInteger = function(test) {
	compareResourceESE(test, "sub/subInteger.pec");
};

exports.testSubPeriod = function(test) {
	compareResourceESE(test, "sub/subPeriod.pec");
};

exports.testSubTime = function(test) {
	compareResourceESE(test, "sub/subTime.pec");
};

