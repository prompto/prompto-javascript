require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testSortBooleans = function(test) {
	compareResourceEPE(test, "sortList/sortBooleans.e");
};

exports.testSortDates = function(test) {
	compareResourceEPE(test, "sortList/sortDates.e");
};

exports.testSortDateTimes = function(test) {
	compareResourceEPE(test, "sortList/sortDateTimes.e");
};

exports.testSortDecimals = function(test) {
	compareResourceEPE(test, "sortList/sortDecimals.e");
};

exports.testSortExpressions = function(test) {
	compareResourceEPE(test, "sortList/sortExpressions.e");
};

exports.testSortIntegers = function(test) {
	compareResourceEPE(test, "sortList/sortIntegers.e");
};

exports.testSortKeys = function(test) {
	compareResourceEPE(test, "sortList/sortKeys.e");
};

exports.testSortMethods = function(test) {
	compareResourceEPE(test, "sortList/sortMethods.e");
};

exports.testSortNames = function(test) {
	compareResourceEPE(test, "sortList/sortNames.e");
};

exports.testSortTexts = function(test) {
	compareResourceEPE(test, "sortList/sortTexts.e");
};

exports.testSortTimes = function(test) {
	compareResourceEPE(test, "sortList/sortTimes.e");
};

