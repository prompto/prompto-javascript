// generated: 2015-07-05T23:01:02.199
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

