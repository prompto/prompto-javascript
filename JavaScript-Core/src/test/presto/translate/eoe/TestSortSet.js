require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSortBooleans = function(test) {
	compareResourceEOE(test, "sortSet/sortBooleans.e");
};

exports.testSortDates = function(test) {
	compareResourceEOE(test, "sortSet/sortDates.e");
};

exports.testSortDateTimes = function(test) {
	compareResourceEOE(test, "sortSet/sortDateTimes.e");
};

exports.testSortDecimals = function(test) {
	compareResourceEOE(test, "sortSet/sortDecimals.e");
};

exports.testSortExpressions = function(test) {
	compareResourceEOE(test, "sortSet/sortExpressions.e");
};

exports.testSortIntegers = function(test) {
	compareResourceEOE(test, "sortSet/sortIntegers.e");
};

exports.testSortKeys = function(test) {
	compareResourceEOE(test, "sortSet/sortKeys.e");
};

exports.testSortMethods = function(test) {
	compareResourceEOE(test, "sortSet/sortMethods.e");
};

exports.testSortNames = function(test) {
	compareResourceEOE(test, "sortSet/sortNames.e");
};

exports.testSortTexts = function(test) {
	compareResourceEOE(test, "sortSet/sortTexts.e");
};

exports.testSortTimes = function(test) {
	compareResourceEOE(test, "sortSet/sortTimes.e");
};

