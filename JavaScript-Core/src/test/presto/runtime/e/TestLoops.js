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

exports.testDoWhile = function(test) {
	checkOutput(test, "loops/doWhile.e");
};

exports.testForEachCharacterRange = function(test) {
	checkOutput(test, "loops/forEachCharacterRange.e");
};

exports.testForEachCharacterRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachCharacterRangeWithIndex.e");
};

exports.testForEachDateRange = function(test) {
	checkOutput(test, "loops/forEachDateRange.e");
};

exports.testForEachDateRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachDateRangeWithIndex.e");
};

exports.testForEachDictionaryItem = function(test) {
	checkOutput(test, "loops/forEachDictionaryItem.e");
};

exports.testForEachDictionaryItemWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryItemWithIndex.e");
};

exports.testForEachDictionaryKey = function(test) {
	checkOutput(test, "loops/forEachDictionaryKey.e");
};

exports.testForEachDictionaryKeyWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryKeyWithIndex.e");
};

exports.testForEachDictionaryValue = function(test) {
	checkOutput(test, "loops/forEachDictionaryValue.e");
};

exports.testForEachDictionaryValueWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryValueWithIndex.e");
};

exports.testForEachInstanceList = function(test) {
	checkOutput(test, "loops/forEachInstanceList.e");
};

exports.testForEachInstanceListWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceListWithIndex.e");
};

exports.testForEachInstanceSet = function(test) {
	checkOutput(test, "loops/forEachInstanceSet.e");
};

exports.testForEachInstanceSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceSetWithIndex.e");
};

exports.testForEachIntegerList = function(test) {
	checkOutput(test, "loops/forEachIntegerList.e");
};

exports.testForEachIntegerListWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerListWithIndex.e");
};

exports.testForEachIntegerRange = function(test) {
	checkOutput(test, "loops/forEachIntegerRange.e");
};

exports.testForEachIntegerRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerRangeWithIndex.e");
};

exports.testForEachIntegerSet = function(test) {
	checkOutput(test, "loops/forEachIntegerSet.e");
};

exports.testForEachIntegerSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerSetWithIndex.e");
};

exports.testForEachTimeRange = function(test) {
	checkOutput(test, "loops/forEachTimeRange.e");
};

exports.testForEachTimeRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachTimeRangeWithIndex.e");
};

exports.testForEachTupleList = function(test) {
	checkOutput(test, "loops/forEachTupleList.e");
};

exports.testForEachTupleListWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleListWithIndex.e");
};

exports.testForEachTupleSet = function(test) {
	checkOutput(test, "loops/forEachTupleSet.e");
};

exports.testForEachTupleSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleSetWithIndex.e");
};

exports.testWhile = function(test) {
	checkOutput(test, "loops/while.e");
};

