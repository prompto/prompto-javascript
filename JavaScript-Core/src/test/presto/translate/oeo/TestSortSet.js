require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSortBooleans = function(test) {
	compareResourceOEO(test, "sortSet/sortBooleans.o");
};

exports.testSortDates = function(test) {
	compareResourceOEO(test, "sortSet/sortDates.o");
};

exports.testSortDateTimes = function(test) {
	compareResourceOEO(test, "sortSet/sortDateTimes.o");
};

exports.testSortDecimals = function(test) {
	compareResourceOEO(test, "sortSet/sortDecimals.o");
};

exports.testSortExpressions = function(test) {
	compareResourceOEO(test, "sortSet/sortExpressions.o");
};

exports.testSortIntegers = function(test) {
	compareResourceOEO(test, "sortSet/sortIntegers.o");
};

exports.testSortKeys = function(test) {
	compareResourceOEO(test, "sortSet/sortKeys.o");
};

exports.testSortMethods = function(test) {
	compareResourceOEO(test, "sortSet/sortMethods.o");
};

exports.testSortNames = function(test) {
	compareResourceOEO(test, "sortSet/sortNames.o");
};

exports.testSortTexts = function(test) {
	compareResourceOEO(test, "sortSet/sortTexts.o");
};

exports.testSortTimes = function(test) {
	compareResourceOEO(test, "sortSet/sortTimes.o");
};

