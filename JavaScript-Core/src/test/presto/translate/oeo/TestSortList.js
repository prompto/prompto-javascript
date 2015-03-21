require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSortBooleans = function(test) {
	compareResourceOEO(test, "sortList/sortBooleans.o");
};

exports.testSortDates = function(test) {
	compareResourceOEO(test, "sortList/sortDates.o");
};

exports.testSortDateTimes = function(test) {
	compareResourceOEO(test, "sortList/sortDateTimes.o");
};

exports.testSortDecimals = function(test) {
	compareResourceOEO(test, "sortList/sortDecimals.o");
};

exports.testSortExpressions = function(test) {
	compareResourceOEO(test, "sortList/sortExpressions.o");
};

exports.testSortIntegers = function(test) {
	compareResourceOEO(test, "sortList/sortIntegers.o");
};

exports.testSortKeys = function(test) {
	compareResourceOEO(test, "sortList/sortKeys.o");
};

exports.testSortMethods = function(test) {
	compareResourceOEO(test, "sortList/sortMethods.o");
};

exports.testSortNames = function(test) {
	compareResourceOEO(test, "sortList/sortNames.o");
};

exports.testSortTexts = function(test) {
	compareResourceOEO(test, "sortList/sortTexts.o");
};

exports.testSortTimes = function(test) {
	compareResourceOEO(test, "sortList/sortTimes.o");
};

