require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testSortBooleans = function(test) {
	compareResourceEOE(test, "sortList/sortBooleans.pec");
};

require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testSortDates = function(test) {
	compareResourceEOE(test, "sortList/sortDates.pec");
};

exports.testSortDateTimes = function(test) {
	compareResourceEOE(test, "sortList/sortDateTimes.pec");
};

exports.testSortDecimals = function(test) {
	compareResourceEOE(test, "sortList/sortDecimals.pec");
};

exports.testSortExpressions = function(test) {
	compareResourceEOE(test, "sortList/sortExpressions.pec");
};

exports.testSortIntegers = function(test) {
	compareResourceEOE(test, "sortList/sortIntegers.pec");
};

exports.testSortKeys = function(test) {
	compareResourceEOE(test, "sortList/sortKeys.pec");
};

exports.testSortMethods = function(test) {
	compareResourceEOE(test, "sortList/sortMethods.pec");
};

exports.testSortNames = function(test) {
	compareResourceEOE(test, "sortList/sortNames.pec");
};

exports.testSortTexts = function(test) {
	compareResourceEOE(test, "sortList/sortTexts.pec");
};

exports.testSortTimes = function(test) {
	compareResourceEOE(test, "sortList/sortTimes.pec");
};

