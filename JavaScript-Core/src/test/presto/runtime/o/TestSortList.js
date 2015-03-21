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
	checkOutput(test, "sortList/sortBooleans.o");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortList/sortDates.o");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortList/sortDateTimes.o");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortList/sortDecimals.o");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortList/sortExpressions.o");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortList/sortIntegers.o");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortList/sortKeys.o");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortList/sortMethods.o");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortList/sortNames.o");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortList/sortTexts.o");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortList/sortTimes.o");
};

