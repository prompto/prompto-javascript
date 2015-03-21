require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testSortBooleans = function(test) {
	compareResourceEPE(test, "sortSet/sortBooleans.e");
};

exports.testSortDates = function(test) {
	compareResourceEPE(test, "sortSet/sortDates.e");
};

exports.testSortDateTimes = function(test) {
	compareResourceEPE(test, "sortSet/sortDateTimes.e");
};

exports.testSortDecimals = function(test) {
	compareResourceEPE(test, "sortSet/sortDecimals.e");
};

exports.testSortExpressions = function(test) {
	compareResourceEPE(test, "sortSet/sortExpressions.e");
};

exports.testSortIntegers = function(test) {
	compareResourceEPE(test, "sortSet/sortIntegers.e");
};

exports.testSortKeys = function(test) {
	compareResourceEPE(test, "sortSet/sortKeys.e");
};

exports.testSortMethods = function(test) {
	compareResourceEPE(test, "sortSet/sortMethods.e");
};

exports.testSortNames = function(test) {
	compareResourceEPE(test, "sortSet/sortNames.e");
};

exports.testSortTexts = function(test) {
	compareResourceEPE(test, "sortSet/sortTexts.e");
};

exports.testSortTimes = function(test) {
	compareResourceEPE(test, "sortSet/sortTimes.e");
};

