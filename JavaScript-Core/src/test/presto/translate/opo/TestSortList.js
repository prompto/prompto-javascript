require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testSortBooleans = function(test) {
	compareResourceOPO(test, "sortList/sortBooleans.o");
};

exports.testSortDates = function(test) {
	compareResourceOPO(test, "sortList/sortDates.o");
};

exports.testSortDateTimes = function(test) {
	compareResourceOPO(test, "sortList/sortDateTimes.o");
};

exports.testSortDecimals = function(test) {
	compareResourceOPO(test, "sortList/sortDecimals.o");
};

exports.testSortExpressions = function(test) {
	compareResourceOPO(test, "sortList/sortExpressions.o");
};

exports.testSortIntegers = function(test) {
	compareResourceOPO(test, "sortList/sortIntegers.o");
};

exports.testSortKeys = function(test) {
	compareResourceOPO(test, "sortList/sortKeys.o");
};

exports.testSortMethods = function(test) {
	compareResourceOPO(test, "sortList/sortMethods.o");
};

exports.testSortNames = function(test) {
	compareResourceOPO(test, "sortList/sortNames.o");
};

exports.testSortTexts = function(test) {
	compareResourceOPO(test, "sortList/sortTexts.o");
};

exports.testSortTimes = function(test) {
	compareResourceOPO(test, "sortList/sortTimes.o");
};

