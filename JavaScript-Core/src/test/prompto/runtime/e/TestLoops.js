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
	checkOutput(test, "loops/doWhile.pec");
};

exports.testDoWhileBreak = function(test) {
	checkOutput(test, "loops/doWhileBreak.pec");
};

exports.testEmbeddedForEach = function(test) {
	checkOutput(test, "loops/embeddedForEach.pec");
};

exports.testForEachBreak = function(test) {
	checkOutput(test, "loops/forEachBreak.pec");
};

exports.testForEachCharacterRange = function(test) {
	checkOutput(test, "loops/forEachCharacterRange.pec");
};

exports.testForEachCharacterRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachCharacterRangeWithIndex.pec");
};

exports.testForEachDateRange = function(test) {
	checkOutput(test, "loops/forEachDateRange.pec");
};

exports.testForEachDateRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachDateRangeWithIndex.pec");
};

exports.testForEachDictionaryItem = function(test) {
	checkOutput(test, "loops/forEachDictionaryItem.pec");
};

exports.testForEachDictionaryItemWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryItemWithIndex.pec");
};

exports.testForEachDictionaryKey = function(test) {
	checkOutput(test, "loops/forEachDictionaryKey.pec");
};

exports.testForEachDictionaryKeyWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryKeyWithIndex.pec");
};

exports.testForEachDictionaryValue = function(test) {
	checkOutput(test, "loops/forEachDictionaryValue.pec");
};

exports.testForEachDictionaryValueWithIndex = function(test) {
	checkOutput(test, "loops/forEachDictionaryValueWithIndex.pec");
};

exports.testForEachInstanceList = function(test) {
	checkOutput(test, "loops/forEachInstanceList.pec");
};

exports.testForEachInstanceListWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceListWithIndex.pec");
};

exports.testForEachInstanceSet = function(test) {
	checkOutput(test, "loops/forEachInstanceSet.pec");
};

exports.testForEachInstanceSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachInstanceSetWithIndex.pec");
};

exports.testForEachIntegerList = function(test) {
	checkOutput(test, "loops/forEachIntegerList.pec");
};

exports.testForEachIntegerListWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerListWithIndex.pec");
};

exports.testForEachIntegerRange = function(test) {
	checkOutput(test, "loops/forEachIntegerRange.pec");
};

exports.testForEachIntegerRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerRangeWithIndex.pec");
};

exports.testForEachIntegerSet = function(test) {
	checkOutput(test, "loops/forEachIntegerSet.pec");
};

exports.testForEachIntegerSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachIntegerSetWithIndex.pec");
};

exports.testForEachTimeRange = function(test) {
	checkOutput(test, "loops/forEachTimeRange.pec");
};

exports.testForEachTimeRangeWithIndex = function(test) {
	checkOutput(test, "loops/forEachTimeRangeWithIndex.pec");
};

exports.testForEachTupleList = function(test) {
	checkOutput(test, "loops/forEachTupleList.pec");
};

exports.testForEachTupleListWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleListWithIndex.pec");
};

exports.testForEachTupleSet = function(test) {
	checkOutput(test, "loops/forEachTupleSet.pec");
};

exports.testForEachTupleSetWithIndex = function(test) {
	checkOutput(test, "loops/forEachTupleSetWithIndex.pec");
};

exports.testWhile = function(test) {
	checkOutput(test, "loops/while.pec");
};

exports.testWhileBreak = function(test) {
	checkOutput(test, "loops/whileBreak.pec");
};

