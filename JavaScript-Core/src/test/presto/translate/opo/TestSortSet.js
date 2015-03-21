require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testSortBooleans = function(test) {
	compareResourceOPO(test, "sortSet/sortBooleans.o");
};

exports.testSortDates = function(test) {
	compareResourceOPO(test, "sortSet/sortDates.o");
};

exports.testSortDateTimes = function(test) {
	compareResourceOPO(test, "sortSet/sortDateTimes.o");
};

exports.testSortDecimals = function(test) {
	compareResourceOPO(test, "sortSet/sortDecimals.o");
};

exports.testSortExpressions = function(test) {
	compareResourceOPO(test, "sortSet/sortExpressions.o");
};

exports.testSortIntegers = function(test) {
	compareResourceOPO(test, "sortSet/sortIntegers.o");
};

exports.testSortKeys = function(test) {
	compareResourceOPO(test, "sortSet/sortKeys.o");
};

exports.testSortMethods = function(test) {
	compareResourceOPO(test, "sortSet/sortMethods.o");
};

exports.testSortNames = function(test) {
	compareResourceOPO(test, "sortSet/sortNames.o");
};

exports.testSortTexts = function(test) {
	compareResourceOPO(test, "sortSet/sortTexts.o");
};

exports.testSortTimes = function(test) {
	compareResourceOPO(test, "sortSet/sortTimes.o");
};

