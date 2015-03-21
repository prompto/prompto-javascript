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
	checkOutput(test, "loops/doWhile.o");
};

exports.testForEachCharacterRange = function(test) {
	checkOutput(test, "loops/forEachCharacterRange.o");
};

exports.testForEachCharacterRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachCharacterRangeWithIndex.o");
};

exports.testForEachDateRange = function(test) {
	checkOutput(test, "loops/forEachDateRange.o");
};

exports.testForEachDateRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachDateRangeWithIndex.o");
};

exports.testForEachDictionaryItem = function(test) {
	checkOutput(test, "loops/forEachDictionaryItem.o");
};

exports.testForEachDictionaryItemWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryItemWithIndex.o");
};

exports.testForEachDictionaryKey = function(test) {
	checkOutput(test, "loops/forEachDictionaryKey.o");
};

exports.testForEachDictionaryKeyWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryKeyWithIndex.o");
};

exports.testForEachDictionaryValue = function(test) {
	checkOutput(test, "loops/forEachDictionaryValue.o");
};

exports.testForEachDictionaryValueWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryValueWithIndex.o");
};

exports.testForEachInstanceList = function(test) {
	checkOutput(test, "loops/forEachInstanceList.o");
};

exports.testForEachInstanceListWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceListWithIndex.o");
};

exports.testForEachInstanceSet = function(test) {
	checkOutput(test, "loops/forEachInstanceSet.o");
};

exports.testForEachInstanceSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceSetWithIndex.o");
};

exports.testForEachIntegerList = function(test) {
	checkOutput(test, "loops/forEachIntegerList.o");
};

exports.testForEachIntegerListWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerListWithIndex.o");
};

exports.testForEachIntegerRange = function(test) {
	checkOutput(test, "loops/forEachIntegerRange.o");
};

exports.testForEachIntegerRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerRangeWithIndex.o");
};

exports.testForEachIntegerSet = function(test) {
	checkOutput(test, "loops/forEachIntegerSet.o");
};

exports.testForEachIntegerSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerSetWithIndex.o");
};

exports.testForEachTimeRange = function(test) {
	checkOutput(test, "loops/forEachTimeRange.o");
};

exports.testForEachTimeRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachTimeRangeWithIndex.o");
};

exports.testForEachTupleList = function(test) {
	checkOutput(test, "loops/forEachTupleList.o");
};

exports.testForEachTupleListWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleListWithIndex.o");
};

exports.testForEachTupleSet = function(test) {
	checkOutput(test, "loops/forEachTupleSet.o");
};

exports.testForEachTupleSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleSetWithIndex.o");
};

exports.testWhile = function(test) {
	checkOutput(test, "loops/while.o");
};

