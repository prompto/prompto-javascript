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
	checkInterpretedOutput(test, "sortSet/sortBooleans.poc");
};

exports.testTranspiledSortBooleans = function(test) {
	checkTranspiledOutput(test, "sortSet/sortBooleans.poc");
};

exports.testInterpretedSortDateTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDateTimes.poc");
};

exports.testTranspiledSortDateTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDateTimes.poc");
};

exports.testInterpretedSortDates = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDates.poc");
};

exports.testTranspiledSortDates = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDates.poc");
};

exports.testInterpretedSortDecimals = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDecimals.poc");
};

exports.testTranspiledSortDecimals = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDecimals.poc");
};

exports.testInterpretedSortDescBooleans = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescBooleans.poc");
};

exports.testTranspiledSortDescBooleans = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescBooleans.poc");
};

exports.testInterpretedSortDescDateTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescDateTimes.poc");
};

exports.testTranspiledSortDescDateTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescDateTimes.poc");
};

exports.testInterpretedSortDescDates = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescDates.poc");
};

exports.testTranspiledSortDescDates = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescDates.poc");
};

exports.testInterpretedSortDescDecimals = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescDecimals.poc");
};

exports.testTranspiledSortDescDecimals = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescDecimals.poc");
};

exports.testInterpretedSortDescExpressions = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescExpressions.poc");
};

exports.testTranspiledSortDescExpressions = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescExpressions.poc");
};

exports.testInterpretedSortDescIntegers = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescIntegers.poc");
};

exports.testTranspiledSortDescIntegers = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescIntegers.poc");
};

exports.testInterpretedSortDescKeys = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescKeys.poc");
};

exports.testTranspiledSortDescKeys = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescKeys.poc");
};

exports.testInterpretedSortDescMethods = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescMethods.poc");
};

exports.testTranspiledSortDescMethods = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescMethods.poc");
};

exports.testInterpretedSortDescNames = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescNames.poc");
};

exports.testTranspiledSortDescNames = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescNames.poc");
};

exports.testInterpretedSortDescTexts = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescTexts.poc");
};

exports.testTranspiledSortDescTexts = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescTexts.poc");
};

exports.testInterpretedSortDescTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescTimes.poc");
};

exports.testTranspiledSortDescTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescTimes.poc");
};

exports.testInterpretedSortExpressions = function(test) {
	checkInterpretedOutput(test, "sortSet/sortExpressions.poc");
};

exports.testTranspiledSortExpressions = function(test) {
	checkTranspiledOutput(test, "sortSet/sortExpressions.poc");
};

exports.testInterpretedSortIntegers = function(test) {
	checkInterpretedOutput(test, "sortSet/sortIntegers.poc");
};

exports.testTranspiledSortIntegers = function(test) {
	checkTranspiledOutput(test, "sortSet/sortIntegers.poc");
};

exports.testInterpretedSortKeys = function(test) {
	checkInterpretedOutput(test, "sortSet/sortKeys.poc");
};

exports.testTranspiledSortKeys = function(test) {
	checkTranspiledOutput(test, "sortSet/sortKeys.poc");
};

exports.testInterpretedSortMethods = function(test) {
	checkInterpretedOutput(test, "sortSet/sortMethods.poc");
};

exports.testTranspiledSortMethods = function(test) {
	checkTranspiledOutput(test, "sortSet/sortMethods.poc");
};

exports.testInterpretedSortNames = function(test) {
	checkInterpretedOutput(test, "sortSet/sortNames.poc");
};

exports.testTranspiledSortNames = function(test) {
	checkTranspiledOutput(test, "sortSet/sortNames.poc");
};

exports.testInterpretedSortTexts = function(test) {
	checkInterpretedOutput(test, "sortSet/sortTexts.poc");
};

exports.testTranspiledSortTexts = function(test) {
	checkTranspiledOutput(test, "sortSet/sortTexts.poc");
};

exports.testInterpretedSortTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortTimes.poc");
};

exports.testTranspiledSortTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortTimes.poc");
};

