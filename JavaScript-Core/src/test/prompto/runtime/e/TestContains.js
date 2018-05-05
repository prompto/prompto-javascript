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

exports.testInterpretedContainsAllDict = function(test) {
	checkInterpretedOutput(test, "contains/containsAllDict.pec");
};

exports.testTranspiledContainsAllDict = function(test) {
	checkTranspiledOutput(test, "contains/containsAllDict.pec");
};

exports.testInterpretedContainsAllList = function(test) {
	checkInterpretedOutput(test, "contains/containsAllList.pec");
};

exports.testTranspiledContainsAllList = function(test) {
	checkTranspiledOutput(test, "contains/containsAllList.pec");
};

exports.testInterpretedContainsAllRange = function(test) {
	checkInterpretedOutput(test, "contains/containsAllRange.pec");
};

exports.testTranspiledContainsAllRange = function(test) {
	checkTranspiledOutput(test, "contains/containsAllRange.pec");
};

exports.testInterpretedContainsAllSet = function(test) {
	checkInterpretedOutput(test, "contains/containsAllSet.pec");
};

exports.testTranspiledContainsAllSet = function(test) {
	checkTranspiledOutput(test, "contains/containsAllSet.pec");
};

exports.testInterpretedContainsAllText = function(test) {
	checkInterpretedOutput(test, "contains/containsAllText.pec");
};

exports.testTranspiledContainsAllText = function(test) {
	checkTranspiledOutput(test, "contains/containsAllText.pec");
};

exports.testInterpretedContainsAllTuple = function(test) {
	checkInterpretedOutput(test, "contains/containsAllTuple.pec");
};

exports.testTranspiledContainsAllTuple = function(test) {
	checkTranspiledOutput(test, "contains/containsAllTuple.pec");
};

exports.testInterpretedContainsAnyDict = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyDict.pec");
};

exports.testTranspiledContainsAnyDict = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyDict.pec");
};

exports.testInterpretedContainsAnyList = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyList.pec");
};

exports.testTranspiledContainsAnyList = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyList.pec");
};

exports.testInterpretedContainsAnyRange = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyRange.pec");
};

exports.testTranspiledContainsAnyRange = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyRange.pec");
};

exports.testInterpretedContainsAnySet = function(test) {
	checkInterpretedOutput(test, "contains/containsAnySet.pec");
};

exports.testTranspiledContainsAnySet = function(test) {
	checkTranspiledOutput(test, "contains/containsAnySet.pec");
};

exports.testInterpretedContainsAnyText = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyText.pec");
};

exports.testTranspiledContainsAnyText = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyText.pec");
};

exports.testInterpretedContainsAnyTuple = function(test) {
	checkInterpretedOutput(test, "contains/containsAnyTuple.pec");
};

exports.testTranspiledContainsAnyTuple = function(test) {
	checkTranspiledOutput(test, "contains/containsAnyTuple.pec");
};

exports.testInterpretedInCharacterRange = function(test) {
	checkInterpretedOutput(test, "contains/inCharacterRange.pec");
};

exports.testTranspiledInCharacterRange = function(test) {
	checkTranspiledOutput(test, "contains/inCharacterRange.pec");
};

exports.testInterpretedInDateRange = function(test) {
	checkInterpretedOutput(test, "contains/inDateRange.pec");
};

exports.testTranspiledInDateRange = function(test) {
	checkTranspiledOutput(test, "contains/inDateRange.pec");
};

exports.testInterpretedInDict = function(test) {
	checkInterpretedOutput(test, "contains/inDict.pec");
};

exports.testTranspiledInDict = function(test) {
	checkTranspiledOutput(test, "contains/inDict.pec");
};

exports.testInterpretedInIntegerRange = function(test) {
	checkInterpretedOutput(test, "contains/inIntegerRange.pec");
};

exports.testTranspiledInIntegerRange = function(test) {
	checkTranspiledOutput(test, "contains/inIntegerRange.pec");
};

exports.testInterpretedInList = function(test) {
	checkInterpretedOutput(test, "contains/inList.pec");
};

exports.testTranspiledInList = function(test) {
	checkTranspiledOutput(test, "contains/inList.pec");
};

exports.testInterpretedInSet = function(test) {
	checkInterpretedOutput(test, "contains/inSet.pec");
};

exports.testTranspiledInSet = function(test) {
	checkTranspiledOutput(test, "contains/inSet.pec");
};

exports.testInterpretedInText = function(test) {
	checkInterpretedOutput(test, "contains/inText.pec");
};

exports.testTranspiledInText = function(test) {
	checkTranspiledOutput(test, "contains/inText.pec");
};

exports.testInterpretedInTimeRange = function(test) {
	checkInterpretedOutput(test, "contains/inTimeRange.pec");
};

exports.testTranspiledInTimeRange = function(test) {
	checkTranspiledOutput(test, "contains/inTimeRange.pec");
};

exports.testInterpretedInTuple = function(test) {
	checkInterpretedOutput(test, "contains/inTuple.pec");
};

exports.testTranspiledInTuple = function(test) {
	checkTranspiledOutput(test, "contains/inTuple.pec");
};

exports.testInterpretedNinCharacterRange = function(test) {
	checkInterpretedOutput(test, "contains/ninCharacterRange.pec");
};

exports.testTranspiledNinCharacterRange = function(test) {
	checkTranspiledOutput(test, "contains/ninCharacterRange.pec");
};

exports.testInterpretedNinDateRange = function(test) {
	checkInterpretedOutput(test, "contains/ninDateRange.pec");
};

exports.testTranspiledNinDateRange = function(test) {
	checkTranspiledOutput(test, "contains/ninDateRange.pec");
};

exports.testInterpretedNinDict = function(test) {
	checkInterpretedOutput(test, "contains/ninDict.pec");
};

exports.testTranspiledNinDict = function(test) {
	checkTranspiledOutput(test, "contains/ninDict.pec");
};

exports.testInterpretedNinIntegerRange = function(test) {
	checkInterpretedOutput(test, "contains/ninIntegerRange.pec");
};

exports.testTranspiledNinIntegerRange = function(test) {
	checkTranspiledOutput(test, "contains/ninIntegerRange.pec");
};

exports.testInterpretedNinList = function(test) {
	checkInterpretedOutput(test, "contains/ninList.pec");
};

exports.testTranspiledNinList = function(test) {
	checkTranspiledOutput(test, "contains/ninList.pec");
};

exports.testInterpretedNinSet = function(test) {
	checkInterpretedOutput(test, "contains/ninSet.pec");
};

exports.testTranspiledNinSet = function(test) {
	checkTranspiledOutput(test, "contains/ninSet.pec");
};

exports.testInterpretedNinText = function(test) {
	checkInterpretedOutput(test, "contains/ninText.pec");
};

exports.testTranspiledNinText = function(test) {
	checkTranspiledOutput(test, "contains/ninText.pec");
};

exports.testInterpretedNinTimeRange = function(test) {
	checkInterpretedOutput(test, "contains/ninTimeRange.pec");
};

exports.testTranspiledNinTimeRange = function(test) {
	checkTranspiledOutput(test, "contains/ninTimeRange.pec");
};

