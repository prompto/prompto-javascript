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

exports.testSortDescBooleans = function(test) {
	checkOutput(test, "sortList/sortDescBooleans.pec");
};

exports.testSortDescDates = function(test) {
	checkOutput(test, "sortList/sortDescDates.pec");
};

exports.testSortDescDateTimes = function(test) {
	checkOutput(test, "sortList/sortDescDateTimes.pec");
};

exports.testSortDescDecimals = function(test) {
	checkOutput(test, "sortList/sortDescDecimals.pec");
};

exports.testSortDescExpressions = function(test) {
	checkOutput(test, "sortList/sortDescExpressions.pec");
};

exports.testSortDescIntegers = function(test) {
	checkOutput(test, "sortList/sortDescIntegers.pec");
};

exports.testSortDescKeys = function(test) {
	checkOutput(test, "sortList/sortDescKeys.pec");
};

exports.testSortDescMethods = function(test) {
	checkOutput(test, "sortList/sortDescMethods.pec");
};

exports.testSortDescNames = function(test) {
	checkOutput(test, "sortList/sortDescNames.pec");
};

exports.testSortDescTexts = function(test) {
	checkOutput(test, "sortList/sortDescTexts.pec");
};

exports.testSortDescTimes = function(test) {
	checkOutput(test, "sortList/sortDescTimes.pec");
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

