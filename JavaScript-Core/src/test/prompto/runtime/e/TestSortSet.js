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

exports.testSortDates = function(test) {
	checkOutput(test, "sortSet/sortDates.pec");
};

exports.testSortDateTimes = function(test) {
	checkOutput(test, "sortSet/sortDateTimes.pec");
};

exports.testSortDecimals = function(test) {
	checkOutput(test, "sortSet/sortDecimals.pec");
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

