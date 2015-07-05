// generated: 2015-07-05T23:01:02.116
require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDoWhile = function(test) {
	checkOutput(test, "loops/doWhile.poc");
};

exports.testForEachCharacterRange = function(test) {
	checkOutput(test, "loops/forEachCharacterRange.poc");
};

exports.testForEachCharacterRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachCharacterRangeWithIndex.poc");
};

exports.testForEachDateRange = function(test) {
	checkOutput(test, "loops/forEachDateRange.poc");
};

exports.testForEachDateRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachDateRangeWithIndex.poc");
};

exports.testForEachDictionaryItem = function(test) {
	checkOutput(test, "loops/forEachDictionaryItem.poc");
};

exports.testForEachDictionaryItemWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryItemWithIndex.poc");
};

exports.testForEachDictionaryKey = function(test) {
	checkOutput(test, "loops/forEachDictionaryKey.poc");
};

exports.testForEachDictionaryKeyWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryKeyWithIndex.poc");
};

exports.testForEachDictionaryValue = function(test) {
	checkOutput(test, "loops/forEachDictionaryValue.poc");
};

exports.testForEachDictionaryValueWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryValueWithIndex.poc");
};

exports.testForEachInstanceList = function(test) {
	checkOutput(test, "loops/forEachInstanceList.poc");
};

exports.testForEachInstanceListWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceListWithIndex.poc");
};

exports.testForEachInstanceSet = function(test) {
	checkOutput(test, "loops/forEachInstanceSet.poc");
};

exports.testForEachInstanceSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceSetWithIndex.poc");
};

exports.testForEachIntegerList = function(test) {
	checkOutput(test, "loops/forEachIntegerList.poc");
};

exports.testForEachIntegerListWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerListWithIndex.poc");
};

exports.testForEachIntegerRange = function(test) {
	checkOutput(test, "loops/forEachIntegerRange.poc");
};

exports.testForEachIntegerRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerRangeWithIndex.poc");
};

exports.testForEachIntegerSet = function(test) {
	checkOutput(test, "loops/forEachIntegerSet.poc");
};

exports.testForEachIntegerSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerSetWithIndex.poc");
};

exports.testForEachTimeRange = function(test) {
	checkOutput(test, "loops/forEachTimeRange.poc");
};

exports.testForEachTimeRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachTimeRangeWithIndex.poc");
};

exports.testForEachTupleList = function(test) {
	checkOutput(test, "loops/forEachTupleList.poc");
};

exports.testForEachTupleListWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleListWithIndex.poc");
};

exports.testForEachTupleSet = function(test) {
	checkOutput(test, "loops/forEachTupleSet.poc");
};

exports.testForEachTupleSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleSetWithIndex.poc");
};

exports.testWhile = function(test) {
	checkOutput(test, "loops/while.poc");
};

