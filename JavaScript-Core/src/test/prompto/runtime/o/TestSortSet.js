// generated: 2015-07-05T23:01:02.207
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
	checkOutput(test, "sortSet/sortBooleans.poc");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortSet/sortDates.poc");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDateTimes.poc");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortSet/sortDecimals.poc");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortSet/sortExpressions.poc");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortSet/sortIntegers.poc");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortSet/sortKeys.poc");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortSet/sortMethods.poc");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortSet/sortNames.poc");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortSet/sortTexts.poc");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortSet/sortTimes.poc");
};

