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
	checkOutput(test, "sortSet/sortBooleans.o");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortSet/sortDates.o");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDateTimes.o");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortSet/sortDecimals.o");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortSet/sortExpressions.o");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortSet/sortIntegers.o");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortSet/sortKeys.o");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortSet/sortMethods.o");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortSet/sortNames.o");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortSet/sortTexts.o");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortSet/sortTimes.o");
};

