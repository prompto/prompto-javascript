require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSortBooleans = function(test) {
	compareResourceEOE(test, "sortSet/sortBooleans.pec");
};

exports.testSortDates = function(test) {
	compareResourceEOE(test, "sortSet/sortDates.pec");
};

exports.testSortDateTimes = function(test) {
	compareResourceEOE(test, "sortSet/sortDateTimes.pec");
};

exports.testSortDecimals = function(test) {
	compareResourceEOE(test, "sortSet/sortDecimals.pec");
};

exports.testSortExpressions = function(test) {
	compareResourceEOE(test, "sortSet/sortExpressions.pec");
};

exports.testSortIntegers = function(test) {
	compareResourceEOE(test, "sortSet/sortIntegers.pec");
};

exports.testSortKeys = function(test) {
	compareResourceEOE(test, "sortSet/sortKeys.pec");
};

exports.testSortMethods = function(test) {
	compareResourceEOE(test, "sortSet/sortMethods.pec");
};

exports.testSortNames = function(test) {
	compareResourceEOE(test, "sortSet/sortNames.pec");
};

exports.testSortTexts = function(test) {
	compareResourceEOE(test, "sortSet/sortTexts.pec");
};

exports.testSortTimes = function(test) {
	compareResourceEOE(test, "sortSet/sortTimes.pec");
};

