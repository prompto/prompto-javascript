require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSubDate = function(test) {
	compareResourceEOE(test, "subtract/subDate.pec");
};

exports.testSubDateTime = function(test) {
	compareResourceEOE(test, "subtract/subDateTime.pec");
};

exports.testSubDecimal = function(test) {
	compareResourceEOE(test, "subtract/subDecimal.pec");
};

exports.testSubDecimalEnum = function(test) {
	compareResourceEOE(test, "subtract/subDecimalEnum.pec");
};

exports.testSubInteger = function(test) {
	compareResourceEOE(test, "subtract/subInteger.pec");
};

exports.testSubIntegerEnum = function(test) {
	compareResourceEOE(test, "subtract/subIntegerEnum.pec");
};

exports.testSubList = function(test) {
	compareResourceEOE(test, "subtract/subList.pec");
};

exports.testSubPeriod = function(test) {
	compareResourceEOE(test, "subtract/subPeriod.pec");
};

exports.testSubSet = function(test) {
	compareResourceEOE(test, "subtract/subSet.pec");
};

exports.testSubTime = function(test) {
	compareResourceEOE(test, "subtract/subTime.pec");
};

