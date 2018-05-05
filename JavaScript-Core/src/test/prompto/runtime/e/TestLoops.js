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

exports.testInterpretedDoWhile = function(test) {
	checkInterpretedOutput(test, "loops/doWhile.pec");
};

exports.testTranspiledDoWhile = function(test) {
	checkTranspiledOutput(test, "loops/doWhile.pec");
};

exports.testInterpretedDoWhileBreak = function(test) {
	checkInterpretedOutput(test, "loops/doWhileBreak.pec");
};

exports.testTranspiledDoWhileBreak = function(test) {
	checkTranspiledOutput(test, "loops/doWhileBreak.pec");
};

exports.testInterpretedEmbeddedForEach = function(test) {
	checkInterpretedOutput(test, "loops/embeddedForEach.pec");
};

exports.testTranspiledEmbeddedForEach = function(test) {
	checkTranspiledOutput(test, "loops/embeddedForEach.pec");
};

exports.testInterpretedForEachBreak = function(test) {
	checkInterpretedOutput(test, "loops/forEachBreak.pec");
};

exports.testTranspiledForEachBreak = function(test) {
	checkTranspiledOutput(test, "loops/forEachBreak.pec");
};

exports.testInterpretedForEachCharacterRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachCharacterRange.pec");
};

exports.testTranspiledForEachCharacterRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachCharacterRange.pec");
};

exports.testInterpretedForEachCharacterRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachCharacterRangeWithIndex.pec");
};

exports.testTranspiledForEachCharacterRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachCharacterRangeWithIndex.pec");
};

exports.testInterpretedForEachDateRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachDateRange.pec");
};

exports.testTranspiledForEachDateRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachDateRange.pec");
};

exports.testInterpretedForEachDateRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDateRangeWithIndex.pec");
};

exports.testTranspiledForEachDateRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDateRangeWithIndex.pec");
};

exports.testInterpretedForEachDictionaryItem = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryItem.pec");
};

exports.testTranspiledForEachDictionaryItem = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryItem.pec");
};

exports.testInterpretedForEachDictionaryItemWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryItemWithIndex.pec");
};

exports.testTranspiledForEachDictionaryItemWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryItemWithIndex.pec");
};

exports.testInterpretedForEachDictionaryKey = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryKey.pec");
};

exports.testTranspiledForEachDictionaryKey = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryKey.pec");
};

exports.testInterpretedForEachDictionaryKeyWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryKeyWithIndex.pec");
};

exports.testTranspiledForEachDictionaryKeyWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryKeyWithIndex.pec");
};

exports.testInterpretedForEachDictionaryValue = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryValue.pec");
};

exports.testTranspiledForEachDictionaryValue = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryValue.pec");
};

exports.testInterpretedForEachDictionaryValueWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryValueWithIndex.pec");
};

exports.testTranspiledForEachDictionaryValueWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryValueWithIndex.pec");
};

exports.testInterpretedForEachInstanceList = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceList.pec");
};

exports.testTranspiledForEachInstanceList = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceList.pec");
};

exports.testInterpretedForEachInstanceListWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceListWithIndex.pec");
};

exports.testTranspiledForEachInstanceListWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceListWithIndex.pec");
};

exports.testInterpretedForEachInstanceSet = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceSet.pec");
};

exports.testTranspiledForEachInstanceSet = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceSet.pec");
};

exports.testInterpretedForEachInstanceSetWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceSetWithIndex.pec");
};

exports.testTranspiledForEachInstanceSetWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceSetWithIndex.pec");
};

exports.testInterpretedForEachIntegerList = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerList.pec");
};

exports.testTranspiledForEachIntegerList = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerList.pec");
};

exports.testInterpretedForEachIntegerListWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerListWithIndex.pec");
};

exports.testTranspiledForEachIntegerListWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerListWithIndex.pec");
};

exports.testInterpretedForEachIntegerRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerRange.pec");
};

exports.testTranspiledForEachIntegerRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerRange.pec");
};

exports.testInterpretedForEachIntegerRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerRangeWithIndex.pec");
};

exports.testTranspiledForEachIntegerRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerRangeWithIndex.pec");
};

exports.testInterpretedForEachIntegerSet = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerSet.pec");
};

exports.testTranspiledForEachIntegerSet = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerSet.pec");
};

exports.testInterpretedForEachIntegerSetWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerSetWithIndex.pec");
};

exports.testTranspiledForEachIntegerSetWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerSetWithIndex.pec");
};

exports.testInterpretedForEachTimeRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachTimeRange.pec");
};

exports.testTranspiledForEachTimeRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachTimeRange.pec");
};

exports.testInterpretedForEachTimeRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachTimeRangeWithIndex.pec");
};

exports.testTranspiledForEachTimeRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachTimeRangeWithIndex.pec");
};

exports.testInterpretedForEachTupleList = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleList.pec");
};

exports.testTranspiledForEachTupleList = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleList.pec");
};

exports.testInterpretedForEachTupleListWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleListWithIndex.pec");
};

exports.testTranspiledForEachTupleListWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleListWithIndex.pec");
};

exports.testInterpretedForEachTupleSet = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleSet.pec");
};

exports.testTranspiledForEachTupleSet = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleSet.pec");
};

exports.testInterpretedForEachTupleSetWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleSetWithIndex.pec");
};

exports.testTranspiledForEachTupleSetWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleSetWithIndex.pec");
};

exports.testInterpretedWhile = function(test) {
	checkInterpretedOutput(test, "loops/while.pec");
};

exports.testTranspiledWhile = function(test) {
	checkTranspiledOutput(test, "loops/while.pec");
};

exports.testInterpretedWhileBreak = function(test) {
	checkInterpretedOutput(test, "loops/whileBreak.pec");
};

exports.testTranspiledWhileBreak = function(test) {
	checkTranspiledOutput(test, "loops/whileBreak.pec");
};

