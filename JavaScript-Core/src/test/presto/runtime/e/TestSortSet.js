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
	checkOutput(test, "sortSet/sortBooleans.e");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortSet/sortDates.e");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDateTimes.e");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortSet/sortDecimals.e");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortSet/sortExpressions.e");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortSet/sortIntegers.e");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortSet/sortKeys.e");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortSet/sortMethods.e");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortSet/sortNames.e");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortSet/sortTexts.e");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortSet/sortTimes.e");
};

