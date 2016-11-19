require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testDoWhile = function(test) {
	compareResourceOMO(test, "loops/doWhile.poc");
};

exports.testDoWhileBreak = function(test) {
	compareResourceOMO(test, "loops/doWhileBreak.poc");
};

exports.testEmbeddedForEach = function(test) {
	compareResourceOMO(test, "loops/embeddedForEach.poc");
};

exports.testForEachBreak = function(test) {
	compareResourceOMO(test, "loops/forEachBreak.poc");
};

exports.testForEachCharacterRange = function(test) {
	compareResourceOMO(test, "loops/forEachCharacterRange.poc");
};

exports.testForEachCharacterRangeWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachCharacterRangeWithIndex.poc");
};

exports.testForEachDateRange = function(test) {
	compareResourceOMO(test, "loops/forEachDateRange.poc");
};

exports.testForEachDateRangeWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachDateRangeWithIndex.poc");
};

exports.testForEachDictionaryItem = function(test) {
	compareResourceOMO(test, "loops/forEachDictionaryItem.poc");
};

exports.testForEachDictionaryItemWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachDictionaryItemWithIndex.poc");
};

exports.testForEachDictionaryKey = function(test) {
	compareResourceOMO(test, "loops/forEachDictionaryKey.poc");
};

exports.testForEachDictionaryKeyWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachDictionaryKeyWithIndex.poc");
};

exports.testForEachDictionaryValue = function(test) {
	compareResourceOMO(test, "loops/forEachDictionaryValue.poc");
};

exports.testForEachDictionaryValueWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachDictionaryValueWithIndex.poc");
};

exports.testForEachInstanceList = function(test) {
	compareResourceOMO(test, "loops/forEachInstanceList.poc");
};

exports.testForEachInstanceListWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachInstanceListWithIndex.poc");
};

exports.testForEachInstanceSet = function(test) {
	compareResourceOMO(test, "loops/forEachInstanceSet.poc");
};

exports.testForEachInstanceSetWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachInstanceSetWithIndex.poc");
};

exports.testForEachIntegerList = function(test) {
	compareResourceOMO(test, "loops/forEachIntegerList.poc");
};

exports.testForEachIntegerListWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachIntegerListWithIndex.poc");
};

exports.testForEachIntegerRange = function(test) {
	compareResourceOMO(test, "loops/forEachIntegerRange.poc");
};

exports.testForEachIntegerRangeWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachIntegerRangeWithIndex.poc");
};

exports.testForEachIntegerSet = function(test) {
	compareResourceOMO(test, "loops/forEachIntegerSet.poc");
};

exports.testForEachIntegerSetWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachIntegerSetWithIndex.poc");
};

exports.testForEachTimeRange = function(test) {
	compareResourceOMO(test, "loops/forEachTimeRange.poc");
};

exports.testForEachTimeRangeWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachTimeRangeWithIndex.poc");
};

exports.testForEachTupleList = function(test) {
	compareResourceOMO(test, "loops/forEachTupleList.poc");
};

exports.testForEachTupleListWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachTupleListWithIndex.poc");
};

exports.testForEachTupleSet = function(test) {
	compareResourceOMO(test, "loops/forEachTupleSet.poc");
};

exports.testForEachTupleSetWithIndex = function(test) {
	compareResourceOMO(test, "loops/forEachTupleSetWithIndex.poc");
};

exports.testWhile = function(test) {
	compareResourceOMO(test, "loops/while.poc");
};

exports.testWhileBreak = function(test) {
	compareResourceOMO(test, "loops/whileBreak.poc");
};

