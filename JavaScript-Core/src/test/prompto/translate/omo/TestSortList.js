require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testSortBooleans = function(test) {
	compareResourceOMO(test, "sortList/sortBooleans.poc");
};

exports.testSortDates = function(test) {
	compareResourceOMO(test, "sortList/sortDates.poc");
};

exports.testSortDateTimes = function(test) {
	compareResourceOMO(test, "sortList/sortDateTimes.poc");
};

exports.testSortDecimals = function(test) {
	compareResourceOMO(test, "sortList/sortDecimals.poc");
};

exports.testSortDescBooleans = function(test) {
	compareResourceOMO(test, "sortList/sortDescBooleans.poc");
};

exports.testSortDescDates = function(test) {
	compareResourceOMO(test, "sortList/sortDescDates.poc");
};

exports.testSortDescDateTimes = function(test) {
	compareResourceOMO(test, "sortList/sortDescDateTimes.poc");
};

exports.testSortDescDecimals = function(test) {
	compareResourceOMO(test, "sortList/sortDescDecimals.poc");
};

exports.testSortDescExpressions = function(test) {
	compareResourceOMO(test, "sortList/sortDescExpressions.poc");
};

exports.testSortDescIntegers = function(test) {
	compareResourceOMO(test, "sortList/sortDescIntegers.poc");
};

exports.testSortDescKeys = function(test) {
	compareResourceOMO(test, "sortList/sortDescKeys.poc");
};

exports.testSortDescMethods = function(test) {
	compareResourceOMO(test, "sortList/sortDescMethods.poc");
};

exports.testSortDescNames = function(test) {
	compareResourceOMO(test, "sortList/sortDescNames.poc");
};

exports.testSortDescTexts = function(test) {
	compareResourceOMO(test, "sortList/sortDescTexts.poc");
};

exports.testSortDescTimes = function(test) {
	compareResourceOMO(test, "sortList/sortDescTimes.poc");
};

exports.testSortExpressions = function(test) {
	compareResourceOMO(test, "sortList/sortExpressions.poc");
};

exports.testSortIntegers = function(test) {
	compareResourceOMO(test, "sortList/sortIntegers.poc");
};

exports.testSortKeys = function(test) {
	compareResourceOMO(test, "sortList/sortKeys.poc");
};

exports.testSortMethods = function(test) {
	compareResourceOMO(test, "sortList/sortMethods.poc");
};

exports.testSortNames = function(test) {
	compareResourceOMO(test, "sortList/sortNames.poc");
};

exports.testSortTexts = function(test) {
	compareResourceOMO(test, "sortList/sortTexts.poc");
};

exports.testSortTimes = function(test) {
	compareResourceOMO(test, "sortList/sortTimes.poc");
};
