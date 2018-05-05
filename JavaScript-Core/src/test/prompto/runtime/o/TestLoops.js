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

exports.testInterpretedDoWhile = function(test) {
	checkInterpretedOutput(test, "loops/doWhile.poc");
};

exports.testTranspiledDoWhile = function(test) {
	checkTranspiledOutput(test, "loops/doWhile.poc");
};

exports.testInterpretedDoWhileBreak = function(test) {
	checkInterpretedOutput(test, "loops/doWhileBreak.poc");
};

exports.testTranspiledDoWhileBreak = function(test) {
	checkTranspiledOutput(test, "loops/doWhileBreak.poc");
};

exports.testInterpretedEmbeddedForEach = function(test) {
	checkInterpretedOutput(test, "loops/embeddedForEach.poc");
};

exports.testTranspiledEmbeddedForEach = function(test) {
	checkTranspiledOutput(test, "loops/embeddedForEach.poc");
};

exports.testInterpretedForEachBreak = function(test) {
	checkInterpretedOutput(test, "loops/forEachBreak.poc");
};

exports.testTranspiledForEachBreak = function(test) {
	checkTranspiledOutput(test, "loops/forEachBreak.poc");
};

exports.testInterpretedForEachCharacterRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachCharacterRange.poc");
};

exports.testTranspiledForEachCharacterRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachCharacterRange.poc");
};

exports.testInterpretedForEachCharacterRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachCharacterRangeWithIndex.poc");
};

exports.testTranspiledForEachCharacterRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachCharacterRangeWithIndex.poc");
};

exports.testInterpretedForEachDateRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachDateRange.poc");
};

exports.testTranspiledForEachDateRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachDateRange.poc");
};

exports.testInterpretedForEachDateRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDateRangeWithIndex.poc");
};

exports.testTranspiledForEachDateRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDateRangeWithIndex.poc");
};

exports.testInterpretedForEachDictionaryItem = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryItem.poc");
};

exports.testTranspiledForEachDictionaryItem = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryItem.poc");
};

exports.testInterpretedForEachDictionaryItemWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryItemWithIndex.poc");
};

exports.testTranspiledForEachDictionaryItemWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryItemWithIndex.poc");
};

exports.testInterpretedForEachDictionaryKey = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryKey.poc");
};

exports.testTranspiledForEachDictionaryKey = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryKey.poc");
};

exports.testInterpretedForEachDictionaryKeyWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryKeyWithIndex.poc");
};

exports.testTranspiledForEachDictionaryKeyWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryKeyWithIndex.poc");
};

exports.testInterpretedForEachDictionaryValue = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryValue.poc");
};

exports.testTranspiledForEachDictionaryValue = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryValue.poc");
};

exports.testInterpretedForEachDictionaryValueWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachDictionaryValueWithIndex.poc");
};

exports.testTranspiledForEachDictionaryValueWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachDictionaryValueWithIndex.poc");
};

exports.testInterpretedForEachInstanceList = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceList.poc");
};

exports.testTranspiledForEachInstanceList = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceList.poc");
};

exports.testInterpretedForEachInstanceListWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceListWithIndex.poc");
};

exports.testTranspiledForEachInstanceListWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceListWithIndex.poc");
};

exports.testInterpretedForEachInstanceSet = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceSet.poc");
};

exports.testTranspiledForEachInstanceSet = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceSet.poc");
};

exports.testInterpretedForEachInstanceSetWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachInstanceSetWithIndex.poc");
};

exports.testTranspiledForEachInstanceSetWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachInstanceSetWithIndex.poc");
};

exports.testInterpretedForEachIntegerList = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerList.poc");
};

exports.testTranspiledForEachIntegerList = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerList.poc");
};

exports.testInterpretedForEachIntegerListWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerListWithIndex.poc");
};

exports.testTranspiledForEachIntegerListWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerListWithIndex.poc");
};

exports.testInterpretedForEachIntegerRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerRange.poc");
};

exports.testTranspiledForEachIntegerRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerRange.poc");
};

exports.testInterpretedForEachIntegerRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerRangeWithIndex.poc");
};

exports.testTranspiledForEachIntegerRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerRangeWithIndex.poc");
};

exports.testInterpretedForEachIntegerSet = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerSet.poc");
};

exports.testTranspiledForEachIntegerSet = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerSet.poc");
};

exports.testInterpretedForEachIntegerSetWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachIntegerSetWithIndex.poc");
};

exports.testTranspiledForEachIntegerSetWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachIntegerSetWithIndex.poc");
};

exports.testInterpretedForEachTimeRange = function(test) {
	checkInterpretedOutput(test, "loops/forEachTimeRange.poc");
};

exports.testTranspiledForEachTimeRange = function(test) {
	checkTranspiledOutput(test, "loops/forEachTimeRange.poc");
};

exports.testInterpretedForEachTimeRangeWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachTimeRangeWithIndex.poc");
};

exports.testTranspiledForEachTimeRangeWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachTimeRangeWithIndex.poc");
};

exports.testInterpretedForEachTupleList = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleList.poc");
};

exports.testTranspiledForEachTupleList = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleList.poc");
};

exports.testInterpretedForEachTupleListWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleListWithIndex.poc");
};

exports.testTranspiledForEachTupleListWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleListWithIndex.poc");
};

exports.testInterpretedForEachTupleSet = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleSet.poc");
};

exports.testTranspiledForEachTupleSet = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleSet.poc");
};

exports.testInterpretedForEachTupleSetWithIndex = function(test) {
	checkInterpretedOutput(test, "loops/forEachTupleSetWithIndex.poc");
};

exports.testTranspiledForEachTupleSetWithIndex = function(test) {
	checkTranspiledOutput(test, "loops/forEachTupleSetWithIndex.poc");
};

exports.testInterpretedWhile = function(test) {
	checkInterpretedOutput(test, "loops/while.poc");
};

exports.testTranspiledWhile = function(test) {
	checkTranspiledOutput(test, "loops/while.poc");
};

exports.testInterpretedWhileBreak = function(test) {
	checkInterpretedOutput(test, "loops/whileBreak.poc");
};

exports.testTranspiledWhileBreak = function(test) {
	checkTranspiledOutput(test, "loops/whileBreak.poc");
};

