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

exports.testSubDecimalEnum = function(test) {
	compareResourceESE(test, "sub/subDecimalEnum.pec");
};

exports.testSubInteger = function(test) {
	compareResourceESE(test, "sub/subInteger.pec");
};

exports.testSubIntegerEnum = function(test) {
	compareResourceESE(test, "sub/subIntegerEnum.pec");
};

exports.testSubPeriod = function(test) {
	compareResourceESE(test, "sub/subPeriod.pec");
};

exports.testSubTime = function(test) {
	compareResourceESE(test, "sub/subTime.pec");
};

