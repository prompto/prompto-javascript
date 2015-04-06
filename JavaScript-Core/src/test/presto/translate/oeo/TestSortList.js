require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testSortBooleans = function(test) {
	compareResourceOEO(test, "sortList/sortBooleans.poc");
};

exports.testSortDates = function(test) {
	compareResourceOEO(test, "sortList/sortDates.poc");
};

exports.testSortDateTimes = function(test) {
	compareResourceOEO(test, "sortList/sortDateTimes.poc");
};

exports.testSortDecimals = function(test) {
	compareResourceOEO(test, "sortList/sortDecimals.poc");
};

exports.testSortExpressions = function(test) {
	compareResourceOEO(test, "sortList/sortExpressions.poc");
};

exports.testSortIntegers = function(test) {
	compareResourceOEO(test, "sortList/sortIntegers.poc");
};

exports.testSortKeys = function(test) {
	compareResourceOEO(test, "sortList/sortKeys.poc");
};

exports.testSortMethods = function(test) {
	compareResourceOEO(test, "sortList/sortMethods.poc");
};

exports.testSortNames = function(test) {
	compareResourceOEO(test, "sortList/sortNames.poc");
};

exports.testSortTexts = function(test) {
	compareResourceOEO(test, "sortList/sortTexts.poc");
};

exports.testSortTimes = function(test) {
	compareResourceOEO(test, "sortList/sortTimes.poc");
};

