require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testSubDate = function(test) {
	compareResourceEME(test, "subtract/subDate.pec");
};

exports.testSubDateTime = function(test) {
	compareResourceEME(test, "subtract/subDateTime.pec");
};

exports.testSubDecimal = function(test) {
	compareResourceEME(test, "subtract/subDecimal.pec");
};

exports.testSubDecimalEnum = function(test) {
	compareResourceEME(test, "subtract/subDecimalEnum.pec");
};

exports.testSubInteger = function(test) {
	compareResourceEME(test, "subtract/subInteger.pec");
};

exports.testSubIntegerEnum = function(test) {
	compareResourceEME(test, "subtract/subIntegerEnum.pec");
};

exports.testSubList = function(test) {
	compareResourceEME(test, "subtract/subList.pec");
};

exports.testSubPeriod = function(test) {
	compareResourceEME(test, "subtract/subPeriod.pec");
};

exports.testSubSet = function(test) {
	compareResourceEME(test, "subtract/subSet.pec");
};

exports.testSubTime = function(test) {
	compareResourceEME(test, "subtract/subTime.pec");
};

