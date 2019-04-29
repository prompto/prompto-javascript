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
	checkInterpretedOutput(test, "sortSet/sortBooleans.pec");
};

exports.testTranspiledSortBooleans = function(test) {
	checkTranspiledOutput(test, "sortSet/sortBooleans.pec");
};

exports.testInterpretedSortDateTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDateTimes.pec");
};

exports.testTranspiledSortDateTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDateTimes.pec");
};

exports.testInterpretedSortDates = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDates.pec");
};

exports.testTranspiledSortDates = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDates.pec");
};

exports.testInterpretedSortDecimals = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDecimals.pec");
};

exports.testTranspiledSortDecimals = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDecimals.pec");
};

exports.testInterpretedSortDescBooleans = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescBooleans.pec");
};

exports.testTranspiledSortDescBooleans = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescBooleans.pec");
};

exports.testInterpretedSortDescDateTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescDateTimes.pec");
};

exports.testTranspiledSortDescDateTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescDateTimes.pec");
};

exports.testInterpretedSortDescDates = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescDates.pec");
};

exports.testTranspiledSortDescDates = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescDates.pec");
};

exports.testInterpretedSortDescDecimals = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescDecimals.pec");
};

exports.testTranspiledSortDescDecimals = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescDecimals.pec");
};

exports.testInterpretedSortDescExpressions = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescExpressions.pec");
};

exports.testTranspiledSortDescExpressions = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescExpressions.pec");
};

exports.testInterpretedSortDescIntegers = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescIntegers.pec");
};

exports.testTranspiledSortDescIntegers = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescIntegers.pec");
};

exports.testInterpretedSortDescKeys = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescKeys.pec");
};

exports.testTranspiledSortDescKeys = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescKeys.pec");
};

exports.testInterpretedSortDescMethods = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescMethods.pec");
};

exports.testTranspiledSortDescMethods = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescMethods.pec");
};

exports.testInterpretedSortDescNames = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescNames.pec");
};

exports.testTranspiledSortDescNames = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescNames.pec");
};

exports.testInterpretedSortDescTexts = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescTexts.pec");
};

exports.testTranspiledSortDescTexts = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescTexts.pec");
};

exports.testInterpretedSortDescTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortDescTimes.pec");
};

exports.testTranspiledSortDescTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortDescTimes.pec");
};

exports.testInterpretedSortExpressions = function(test) {
	checkInterpretedOutput(test, "sortSet/sortExpressions.pec");
};

exports.testTranspiledSortExpressions = function(test) {
	checkTranspiledOutput(test, "sortSet/sortExpressions.pec");
};

exports.testInterpretedSortIntegers = function(test) {
	checkInterpretedOutput(test, "sortSet/sortIntegers.pec");
};

exports.testTranspiledSortIntegers = function(test) {
	checkTranspiledOutput(test, "sortSet/sortIntegers.pec");
};

exports.testInterpretedSortKeys = function(test) {
	checkInterpretedOutput(test, "sortSet/sortKeys.pec");
};

exports.testTranspiledSortKeys = function(test) {
	checkTranspiledOutput(test, "sortSet/sortKeys.pec");
};

exports.testInterpretedSortMethods = function(test) {
	checkInterpretedOutput(test, "sortSet/sortMethods.pec");
};

exports.testTranspiledSortMethods = function(test) {
	checkTranspiledOutput(test, "sortSet/sortMethods.pec");
};

exports.testInterpretedSortNames = function(test) {
	checkInterpretedOutput(test, "sortSet/sortNames.pec");
};

exports.testTranspiledSortNames = function(test) {
	checkTranspiledOutput(test, "sortSet/sortNames.pec");
};

exports.testInterpretedSortTexts = function(test) {
	checkInterpretedOutput(test, "sortSet/sortTexts.pec");
};

exports.testTranspiledSortTexts = function(test) {
	checkTranspiledOutput(test, "sortSet/sortTexts.pec");
};

exports.testInterpretedSortTimes = function(test) {
	checkInterpretedOutput(test, "sortSet/sortTimes.pec");
};

exports.testTranspiledSortTimes = function(test) {
	checkTranspiledOutput(test, "sortSet/sortTimes.pec");
};

