require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testSubDate = function(test) {
	compareResourceEME(test, "sub/subDate.pec");
};

exports.testSubDateTime = function(test) {
	compareResourceEME(test, "sub/subDateTime.pec");
};

exports.testSubDecimal = function(test) {
	compareResourceEME(test, "sub/subDecimal.pec");
};

exports.testSubDecimalEnum = function(test) {
	compareResourceEME(test, "sub/subDecimalEnum.pec");
};

exports.testSubInteger = function(test) {
	compareResourceEME(test, "sub/subInteger.pec");
};

exports.testSubIntegerEnum = function(test) {
	compareResourceEME(test, "sub/subIntegerEnum.pec");
};

exports.testSubPeriod = function(test) {
	compareResourceEME(test, "sub/subPeriod.pec");
};

exports.testSubTime = function(test) {
	compareResourceEME(test, "sub/subTime.pec");
};

