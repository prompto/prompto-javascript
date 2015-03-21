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
	checkOutput(test, "sortList/sortBooleans.e");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortList/sortDates.e");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortList/sortDateTimes.e");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortList/sortDecimals.e");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortList/sortExpressions.e");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortList/sortIntegers.e");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortList/sortKeys.e");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortList/sortMethods.e");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortList/sortNames.e");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortList/sortTexts.e");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortList/sortTimes.e");
};

