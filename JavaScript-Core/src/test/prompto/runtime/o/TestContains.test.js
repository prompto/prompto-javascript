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

exports.testInterpretedContainsAllList = function(test) {
	checkInterpretedOutput(test, "contains/containsAllList.poc");
};

exports.testTranspiledContainsAllList = function(test) {
	checkTranspiledOutput(test, "contains/containsAllList.poc");
};

exports.testInterpretedContainsAllSet = function(test) {
	checkInterpretedOutput(test, "contains/containsAllSet.poc");
};

exports.testTranspiledContainsAllSet = function(test) {
	checkTranspiledOutput(test, "contains/containsAllSet.poc");
};

exports.testInterpretedContainsAllText = function(test) {
	checkInterpretedOutput(test, "contains/containsAllText.poc");
};

exports.testTranspiledContainsAllText = function(test) {
	checkTranspiledOutput(test, "contains/containsAllText.poc");
};

exports.testInterpretedContainsAllTuple = function(test) {
	checkInterpretedOutput(test, "contains/containsAllTuple.poc");
};

exports.testTranspiledContainsAllTuple = function(test) {
	checkTranspiledOutput(test, "contains/containsAllTuple.poc");
};

exports.testInterpretedContainsAnyList = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyList.poc");
};

exports.testTranspiledContainsAnyList = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyList.poc");
};

exports.testInterpretedContainsAnySet = function(test) {
	checkInterpretedOutput(test, "contains/containsAnySet.poc");
};

exports.testTranspiledContainsAnySet = function(test) {
	checkTranspiledOutput(test, "contains/containsAnySet.poc");
};

exports.testInterpretedContainsAnyText = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyText.poc");
};

exports.testTranspiledContainsAnyText = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyText.poc");
};

exports.testInterpretedContainsAnyTuple = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyTuple.poc");
};

exports.testTranspiledContainsAnyTuple = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyTuple.poc");
};

exports.testInterpretedInCharacterRange = function(test) {
	checkInterpretedOutput(test, "contains/inCharacterRange.poc");
};

exports.testTranspiledInCharacterRange = function(test) {
	checkTranspiledOutput(test, "contains/inCharacterRange.poc");
};

exports.testInterpretedInDateRange = function(test) {
	checkInterpretedOutput(test, "contains/inDateRange.poc");
};

exports.testTranspiledInDateRange = function(test) {
	checkTranspiledOutput(test, "contains/inDateRange.poc");
};

exports.testInterpretedInDict = function(test) {
	checkInterpretedOutput(test, "contains/inDict.poc");
};

exports.testTranspiledInDict = function(test) {
	checkTranspiledOutput(test, "contains/inDict.poc");
};

exports.testInterpretedInIntegerRange = function(test) {
	checkInterpretedOutput(test, "contains/inIntegerRange.poc");
};

exports.testTranspiledInIntegerRange = function(test) {
	checkTranspiledOutput(test, "contains/inIntegerRange.poc");
};

exports.testInterpretedInList = function(test) {
	checkInterpretedOutput(test, "contains/inList.poc");
};

exports.testTranspiledInList = function(test) {
	checkTranspiledOutput(test, "contains/inList.poc");
};

exports.testInterpretedInSet = function(test) {
	checkInterpretedOutput(test, "contains/inSet.poc");
};

exports.testTranspiledInSet = function(test) {
	checkTranspiledOutput(test, "contains/inSet.poc");
};

exports.testInterpretedInText = function(test) {
	checkInterpretedOutput(test, "contains/inText.poc");
};

exports.testTranspiledInText = function(test) {
	checkTranspiledOutput(test, "contains/inText.poc");
};

exports.testInterpretedInTimeRange = function(test) {
	checkInterpretedOutput(test, "contains/inTimeRange.poc");
};

exports.testTranspiledInTimeRange = function(test) {
	checkTranspiledOutput(test, "contains/inTimeRange.poc");
};

exports.testInterpretedInTuple = function(test) {
	checkInterpretedOutput(test, "contains/inTuple.poc");
};

exports.testTranspiledInTuple = function(test) {
	checkTranspiledOutput(test, "contains/inTuple.poc");
};

exports.testInterpretedNinCharacterRange = function(test) {
	checkInterpretedOutput(test, "contains/ninCharacterRange.poc");
};

exports.testTranspiledNinCharacterRange = function(test) {
	checkTranspiledOutput(test, "contains/ninCharacterRange.poc");
};

exports.testInterpretedNinDateRange = function(test) {
	checkInterpretedOutput(test, "contains/ninDateRange.poc");
};

exports.testTranspiledNinDateRange = function(test) {
	checkTranspiledOutput(test, "contains/ninDateRange.poc");
};

exports.testInterpretedNinDict = function(test) {
	checkInterpretedOutput(test, "contains/ninDict.poc");
};

exports.testTranspiledNinDict = function(test) {
	checkTranspiledOutput(test, "contains/ninDict.poc");
};

exports.testInterpretedNinIntegerRange = function(test) {
	checkInterpretedOutput(test, "contains/ninIntegerRange.poc");
};

exports.testTranspiledNinIntegerRange = function(test) {
	checkTranspiledOutput(test, "contains/ninIntegerRange.poc");
};

exports.testInterpretedNinList = function(test) {
	checkInterpretedOutput(test, "contains/ninList.poc");
};

exports.testTranspiledNinList = function(test) {
	checkTranspiledOutput(test, "contains/ninList.poc");
};

exports.testInterpretedNinSet = function(test) {
	checkInterpretedOutput(test, "contains/ninSet.poc");
};

exports.testTranspiledNinSet = function(test) {
	checkTranspiledOutput(test, "contains/ninSet.poc");
};

exports.testInterpretedNinText = function(test) {
	checkInterpretedOutput(test, "contains/ninText.poc");
};

exports.testTranspiledNinText = function(test) {
	checkTranspiledOutput(test, "contains/ninText.poc");
};

exports.testInterpretedNinTimeRange = function(test) {
	checkInterpretedOutput(test, "contains/ninTimeRange.poc");
};

exports.testTranspiledNinTimeRange = function(test) {
	checkTranspiledOutput(test, "contains/ninTimeRange.poc");
};

