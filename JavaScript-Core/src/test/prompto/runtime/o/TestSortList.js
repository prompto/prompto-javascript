require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testSortBooleans = function(test) {
	checkOutput(test, "sortList/sortBooleans.poc");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortList/sortDates.poc");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortList/sortDateTimes.poc");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortList/sortDecimals.poc");
};

exports.testSortDescBooleans = function(test) {
	checkOutput(test, "sortList/sortDescBooleans.poc");
};

exports.testSortDescDates = function(test) {
	checkOutput(test, "sortList/sortDescDates.poc");
};

exports.testSortDescDateTimes = function(test) {
	checkOutput(test, "sortList/sortDescDateTimes.poc");
};

exports.testSortDescDecimals = function(test) {
	checkOutput(test, "sortList/sortDescDecimals.poc");
};

exports.testSortDescExpressions = function(test) {
	checkOutput(test, "sortList/sortDescExpressions.poc");
};

exports.testSortDescIntegers = function(test) {
	checkOutput(test, "sortList/sortDescIntegers.poc");
};

exports.testSortDescKeys = function(test) {
	checkOutput(test, "sortList/sortDescKeys.poc");
};

exports.testSortDescMethods = function(test) {
	checkOutput(test, "sortList/sortDescMethods.poc");
};

exports.testSortDescNames = function(test) {
	checkOutput(test, "sortList/sortDescNames.poc");
};

exports.testSortDescTexts = function(test) {
	checkOutput(test, "sortList/sortDescTexts.poc");
};

exports.testSortDescTimes = function(test) {
	checkOutput(test, "sortList/sortDescTimes.poc");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortList/sortExpressions.poc");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortList/sortIntegers.poc");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortList/sortKeys.poc");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortList/sortMethods.poc");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortList/sortNames.poc");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortList/sortTexts.poc");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortList/sortTimes.poc");
};

