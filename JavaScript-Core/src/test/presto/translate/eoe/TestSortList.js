require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSortBooleans = function(test) {
	compareResourceEOE(test, "sortList/sortBooleans.e");
};

exports.testSortDates = function(test) {
	compareResourceEOE(test, "sortList/sortDates.e");
};

exports.testSortDateTimes = function(test) {
	compareResourceEOE(test, "sortList/sortDateTimes.e");
};

exports.testSortDecimals = function(test) {
	compareResourceEOE(test, "sortList/sortDecimals.e");
};

exports.testSortExpressions = function(test) {
	compareResourceEOE(test, "sortList/sortExpressions.e");
};

exports.testSortIntegers = function(test) {
	compareResourceEOE(test, "sortList/sortIntegers.e");
};

exports.testSortKeys = function(test) {
	compareResourceEOE(test, "sortList/sortKeys.e");
};

exports.testSortMethods = function(test) {
	compareResourceEOE(test, "sortList/sortMethods.e");
};

exports.testSortNames = function(test) {
	compareResourceEOE(test, "sortList/sortNames.e");
};

exports.testSortTexts = function(test) {
	compareResourceEOE(test, "sortList/sortTexts.e");
};

exports.testSortTimes = function(test) {
	compareResourceEOE(test, "sortList/sortTimes.e");
};

