require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedSortBooleans = function(test) {
	checkInterpretedOutput(test, "sortList/sortBooleans.pec");
};

exports.testTranspiledSortBooleans = function(test) {
	checkTranspiledOutput(test, "sortList/sortBooleans.pec");
};

exports.testInterpretedSortDateTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortDateTimes.pec");
};

exports.testTranspiledSortDateTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortDateTimes.pec");
};

exports.testInterpretedSortDates = function(test) {
	checkInterpretedOutput(test, "sortList/sortDates.pec");
};

exports.testTranspiledSortDates = function(test) {
	checkTranspiledOutput(test, "sortList/sortDates.pec");
};

exports.testInterpretedSortDecimals = function(test) {
	checkInterpretedOutput(test, "sortList/sortDecimals.pec");
};

exports.testTranspiledSortDecimals = function(test) {
	checkTranspiledOutput(test, "sortList/sortDecimals.pec");
};

exports.testInterpretedSortDescBooleans = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescBooleans.pec");
};

exports.testTranspiledSortDescBooleans = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescBooleans.pec");
};

exports.testInterpretedSortDescDateTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescDateTimes.pec");
};

exports.testTranspiledSortDescDateTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescDateTimes.pec");
};

exports.testInterpretedSortDescDates = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescDates.pec");
};

exports.testTranspiledSortDescDates = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescDates.pec");
};

exports.testInterpretedSortDescDecimals = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescDecimals.pec");
};

exports.testTranspiledSortDescDecimals = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescDecimals.pec");
};

exports.testInterpretedSortDescExpressions = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescExpressions.pec");
};

exports.testTranspiledSortDescExpressions = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescExpressions.pec");
};

exports.testInterpretedSortDescIntegers = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescIntegers.pec");
};

exports.testTranspiledSortDescIntegers = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescIntegers.pec");
};

exports.testInterpretedSortDescKeys = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescKeys.pec");
};

exports.testTranspiledSortDescKeys = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescKeys.pec");
};

exports.testInterpretedSortDescMethods = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescMethods.pec");
};

exports.testTranspiledSortDescMethods = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescMethods.pec");
};

exports.testInterpretedSortDescNames = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescNames.pec");
};

exports.testTranspiledSortDescNames = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescNames.pec");
};

exports.testInterpretedSortDescTexts = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescTexts.pec");
};

exports.testTranspiledSortDescTexts = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescTexts.pec");
};

exports.testInterpretedSortDescTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescTimes.pec");
};

exports.testTranspiledSortDescTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescTimes.pec");
};

exports.testInterpretedSortExpressions = function(test) {
	checkInterpretedOutput(test, "sortList/sortExpressions.pec");
};

exports.testTranspiledSortExpressions = function(test) {
	checkTranspiledOutput(test, "sortList/sortExpressions.pec");
};

exports.testInterpretedSortIntegers = function(test) {
	checkInterpretedOutput(test, "sortList/sortIntegers.pec");
};

exports.testTranspiledSortIntegers = function(test) {
	checkTranspiledOutput(test, "sortList/sortIntegers.pec");
};

exports.testInterpretedSortKeys = function(test) {
	checkInterpretedOutput(test, "sortList/sortKeys.pec");
};

exports.testTranspiledSortKeys = function(test) {
	checkTranspiledOutput(test, "sortList/sortKeys.pec");
};

exports.testInterpretedSortMethods = function(test) {
	checkInterpretedOutput(test, "sortList/sortMethods.pec");
};

exports.testTranspiledSortMethods = function(test) {
	checkTranspiledOutput(test, "sortList/sortMethods.pec");
};

exports.testInterpretedSortNames = function(test) {
	checkInterpretedOutput(test, "sortList/sortNames.pec");
};

exports.testTranspiledSortNames = function(test) {
	checkTranspiledOutput(test, "sortList/sortNames.pec");
};

exports.testInterpretedSortTexts = function(test) {
	checkInterpretedOutput(test, "sortList/sortTexts.pec");
};

exports.testTranspiledSortTexts = function(test) {
	checkTranspiledOutput(test, "sortList/sortTexts.pec");
};

exports.testInterpretedSortTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortTimes.pec");
};

exports.testTranspiledSortTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortTimes.pec");
};

