require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testContainsAllList = function(test) {
	compareResourceOMO(test, "contains/containsAllList.poc");
};

exports.testContainsAllSet = function(test) {
	compareResourceOMO(test, "contains/containsAllSet.poc");
};

exports.testContainsAllText = function(test) {
	compareResourceOMO(test, "contains/containsAllText.poc");
};

exports.testContainsAllTuple = function(test) {
	compareResourceOMO(test, "contains/containsAllTuple.poc");
};

exports.testContainsAnyList = function(test) {
	compareResourceOMO(test, "contains/containsAnyList.poc");
};

exports.testContainsAnySet = function(test) {
	compareResourceOMO(test, "contains/containsAnySet.poc");
};

exports.testContainsAnyText = function(test) {
	compareResourceOMO(test, "contains/containsAnyText.poc");
};

exports.testContainsAnyTuple = function(test) {
	compareResourceOMO(test, "contains/containsAnyTuple.poc");
};

exports.testInCharacterRange = function(test) {
	compareResourceOMO(test, "contains/inCharacterRange.poc");
};

exports.testInDateRange = function(test) {
	compareResourceOMO(test, "contains/inDateRange.poc");
};

exports.testInDict = function(test) {
	compareResourceOMO(test, "contains/inDict.poc");
};

exports.testInIntegerRange = function(test) {
	compareResourceOMO(test, "contains/inIntegerRange.poc");
};

exports.testInList = function(test) {
	compareResourceOMO(test, "contains/inList.poc");
};

exports.testInSet = function(test) {
	compareResourceOMO(test, "contains/inSet.poc");
};

exports.testInText = function(test) {
	compareResourceOMO(test, "contains/inText.poc");
};

exports.testInTimeRange = function(test) {
	compareResourceOMO(test, "contains/inTimeRange.poc");
};

exports.testInTuple = function(test) {
	compareResourceOMO(test, "contains/inTuple.poc");
};

exports.testNinCharacterRange = function(test) {
	compareResourceOMO(test, "contains/ninCharacterRange.poc");
};

exports.testNinDateRange = function(test) {
	compareResourceOMO(test, "contains/ninDateRange.poc");
};

exports.testNinDict = function(test) {
	compareResourceOMO(test, "contains/ninDict.poc");
};

exports.testNinIntegerRange = function(test) {
	compareResourceOMO(test, "contains/ninIntegerRange.poc");
};

exports.testNinList = function(test) {
	compareResourceOMO(test, "contains/ninList.poc");
};

exports.testNinSet = function(test) {
	compareResourceOMO(test, "contains/ninSet.poc");
};

exports.testNinText = function(test) {
	compareResourceOMO(test, "contains/ninText.poc");
};

exports.testNinTimeRange = function(test) {
	compareResourceOMO(test, "contains/ninTimeRange.poc");
};

