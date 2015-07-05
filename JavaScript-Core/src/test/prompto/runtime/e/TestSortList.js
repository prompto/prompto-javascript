// generated: 2015-07-05T23:01:02.196
require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testSortBooleans = function(test) {
	checkOutput(test, "sortList/sortBooleans.pec");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortList/sortDates.pec");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortList/sortDateTimes.pec");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortList/sortDecimals.pec");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortList/sortExpressions.pec");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortList/sortIntegers.pec");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortList/sortKeys.pec");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortList/sortMethods.pec");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortList/sortNames.pec");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortList/sortTexts.pec");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortList/sortTimes.pec");
};

