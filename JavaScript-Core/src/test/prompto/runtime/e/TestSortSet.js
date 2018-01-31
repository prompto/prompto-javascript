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
	checkOutput(test, "sortSet/sortBooleans.pec");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDateTimes.pec");
};

exports.testSortDates = function(test) {
	checkOutput(test, "sortSet/sortDates.pec");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortSet/sortDecimals.pec");
};

exports.testSortDescBooleans = function(test) {
	checkOutput(test, "sortSet/sortDescBooleans.pec");
};

exports.testSortDescDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDescDateTimes.pec");
};

exports.testSortDescDates = function(test) {
	checkOutput(test, "sortSet/sortDescDates.pec");
};

exports.testSortDescDecimals = function(test) {
	checkOutput(test, "sortSet/sortDescDecimals.pec");
};

exports.testSortDescExpressions = function(test) {
	checkOutput(test, "sortSet/sortDescExpressions.pec");
};

exports.testSortDescIntegers = function(test) {
	checkOutput(test, "sortSet/sortDescIntegers.pec");
};

exports.testSortDescKeys = function(test) {
	checkOutput(test, "sortSet/sortDescKeys.pec");
};

exports.testSortDescMethods = function(test) {
	checkOutput(test, "sortSet/sortDescMethods.pec");
};

exports.testSortDescNames = function(test) {
	checkOutput(test, "sortSet/sortDescNames.pec");
};

exports.testSortDescTexts = function(test) {
	checkOutput(test, "sortSet/sortDescTexts.pec");
};

exports.testSortDescTimes = function(test) {
	checkOutput(test, "sortSet/sortDescTimes.pec");
};

exports.testSortExpressions = function(test) {
	checkOutput(test, "sortSet/sortExpressions.pec");
};

exports.testSortIntegers = function(test) {
	checkOutput(test, "sortSet/sortIntegers.pec");
};

exports.testSortKeys = function(test) {
	checkOutput(test, "sortSet/sortKeys.pec");
};

exports.testSortMethods = function(test) {
	checkOutput(test, "sortSet/sortMethods.pec");
};

exports.testSortNames = function(test) {
	checkOutput(test, "sortSet/sortNames.pec");
};

exports.testSortTexts = function(test) {
	checkOutput(test, "sortSet/sortTexts.pec");
};

exports.testSortTimes = function(test) {
	checkOutput(test, "sortSet/sortTimes.pec");
};

