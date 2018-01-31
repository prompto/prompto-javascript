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

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDateTimes.poc");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortSet/sortDates.poc");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortSet/sortDecimals.poc");
};

exports.testSortDescBooleans = function(test) {
	checkOutput(test, "sortSet/sortDescBooleans.poc");
};

exports.testSortDescDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDescDateTimes.poc");
};

exports.testSortDescDates = function(test) {
	checkOutput(test, "sortSet/sortDescDates.poc");
};

exports.testSortDescDecimals = function(test) {
	checkOutput(test, "sortSet/sortDescDecimals.poc");
};

exports.testSortDescExpressions = function(test) {
	checkOutput(test, "sortSet/sortDescExpressions.poc");
};

exports.testSortDescIntegers = function(test) {
	checkOutput(test, "sortSet/sortDescIntegers.poc");
};

exports.testSortDescKeys = function(test) {
	checkOutput(test, "sortSet/sortDescKeys.poc");
};

exports.testSortDescMethods = function(test) {
	checkOutput(test, "sortSet/sortDescMethods.poc");
};

exports.testSortDescNames = function(test) {
	checkOutput(test, "sortSet/sortDescNames.poc");
};

exports.testSortDescTexts = function(test) {
	checkOutput(test, "sortSet/sortDescTexts.poc");
};

exports.testSortDescTimes = function(test) {
	checkOutput(test, "sortSet/sortDescTimes.poc");
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

