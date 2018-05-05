require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedSortBooleans = function(test) {
	checkInterpretedOutput(test, "sortList/sortBooleans.poc");
};

exports.testTranspiledSortBooleans = function(test) {
	checkTranspiledOutput(test, "sortList/sortBooleans.poc");
};

exports.testInterpretedSortDateTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortDateTimes.poc");
};

exports.testTranspiledSortDateTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortDateTimes.poc");
};

exports.testInterpretedSortDates = function(test) {
	checkInterpretedOutput(test, "sortList/sortDates.poc");
};

exports.testTranspiledSortDates = function(test) {
	checkTranspiledOutput(test, "sortList/sortDates.poc");
};

exports.testInterpretedSortDecimals = function(test) {
	checkInterpretedOutput(test, "sortList/sortDecimals.poc");
};

exports.testTranspiledSortDecimals = function(test) {
	checkTranspiledOutput(test, "sortList/sortDecimals.poc");
};

exports.testInterpretedSortDescBooleans = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescBooleans.poc");
};

exports.testTranspiledSortDescBooleans = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescBooleans.poc");
};

exports.testInterpretedSortDescDateTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescDateTimes.poc");
};

exports.testTranspiledSortDescDateTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescDateTimes.poc");
};

exports.testInterpretedSortDescDates = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescDates.poc");
};

exports.testTranspiledSortDescDates = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescDates.poc");
};

exports.testInterpretedSortDescDecimals = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescDecimals.poc");
};

exports.testTranspiledSortDescDecimals = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescDecimals.poc");
};

exports.testInterpretedSortDescExpressions = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescExpressions.poc");
};

exports.testTranspiledSortDescExpressions = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescExpressions.poc");
};

exports.testInterpretedSortDescIntegers = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescIntegers.poc");
};

exports.testTranspiledSortDescIntegers = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescIntegers.poc");
};

exports.testInterpretedSortDescKeys = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescKeys.poc");
};

exports.testTranspiledSortDescKeys = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescKeys.poc");
};

exports.testInterpretedSortDescMethods = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescMethods.poc");
};

exports.testTranspiledSortDescMethods = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescMethods.poc");
};

exports.testInterpretedSortDescNames = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescNames.poc");
};

exports.testTranspiledSortDescNames = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescNames.poc");
};

exports.testInterpretedSortDescTexts = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescTexts.poc");
};

exports.testTranspiledSortDescTexts = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescTexts.poc");
};

exports.testInterpretedSortDescTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortDescTimes.poc");
};

exports.testTranspiledSortDescTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortDescTimes.poc");
};

exports.testInterpretedSortExpressions = function(test) {
	checkInterpretedOutput(test, "sortList/sortExpressions.poc");
};

exports.testTranspiledSortExpressions = function(test) {
	checkTranspiledOutput(test, "sortList/sortExpressions.poc");
};

exports.testInterpretedSortIntegers = function(test) {
	checkInterpretedOutput(test, "sortList/sortIntegers.poc");
};

exports.testTranspiledSortIntegers = function(test) {
	checkTranspiledOutput(test, "sortList/sortIntegers.poc");
};

exports.testInterpretedSortKeys = function(test) {
	checkInterpretedOutput(test, "sortList/sortKeys.poc");
};

exports.testTranspiledSortKeys = function(test) {
	checkTranspiledOutput(test, "sortList/sortKeys.poc");
};

exports.testInterpretedSortMethods = function(test) {
	checkInterpretedOutput(test, "sortList/sortMethods.poc");
};

exports.testTranspiledSortMethods = function(test) {
	checkTranspiledOutput(test, "sortList/sortMethods.poc");
};

exports.testInterpretedSortNames = function(test) {
	checkInterpretedOutput(test, "sortList/sortNames.poc");
};

exports.testTranspiledSortNames = function(test) {
	checkTranspiledOutput(test, "sortList/sortNames.poc");
};

exports.testInterpretedSortTexts = function(test) {
	checkInterpretedOutput(test, "sortList/sortTexts.poc");
};

exports.testTranspiledSortTexts = function(test) {
	checkTranspiledOutput(test, "sortList/sortTexts.poc");
};

exports.testInterpretedSortTimes = function(test) {
	checkInterpretedOutput(test, "sortList/sortTimes.poc");
};

exports.testTranspiledSortTimes = function(test) {
	checkTranspiledOutput(test, "sortList/sortTimes.poc");
};

