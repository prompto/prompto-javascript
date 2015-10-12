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

exports.testContainsAllList = function(test) {
	checkOutput(test, "contains/containsAllList.poc");
};

exports.testContainsAllSet = function(test) {
	checkOutput(test, "contains/containsAllSet.poc");
};

exports.testContainsAllText = function(test) {
	checkOutput(test, "contains/containsAllText.poc");
};

exports.testContainsAllTuple = function(test) {
	checkOutput(test, "contains/containsAllTuple.poc");
};

exports.testContainsAnyList = function(test) {
	checkOutput(test, "contains/containsAnyList.poc");
};

exports.testContainsAnySet = function(test) {
	checkOutput(test, "contains/containsAnySet.poc");
};

exports.testContainsAnyText = function(test) {
	checkOutput(test, "contains/containsAnyText.poc");
};

exports.testContainsAnyTuple = function(test) {
	checkOutput(test, "contains/containsAnyTuple.poc");
};

exports.testInCharacterRange = function(test) {
	checkOutput(test, "contains/inCharacterRange.poc");
};

exports.testInDateRange = function(test) {
	checkOutput(test, "contains/inDateRange.poc");
};

exports.testInDict = function(test) {
	checkOutput(test, "contains/inDict.poc");
};

exports.testInIntegerRange = function(test) {
	checkOutput(test, "contains/inIntegerRange.poc");
};

exports.testInList = function(test) {
	checkOutput(test, "contains/inList.poc");
};

exports.testInSet = function(test) {
	checkOutput(test, "contains/inSet.poc");
};

exports.testInText = function(test) {
	checkOutput(test, "contains/inText.poc");
};

exports.testInTimeRange = function(test) {
	checkOutput(test, "contains/inTimeRange.poc");
};

exports.testInTuple = function(test) {
	checkOutput(test, "contains/inTuple.poc");
};

exports.testNinCharacterRange = function(test) {
	checkOutput(test, "contains/ninCharacterRange.poc");
};

exports.testNinDateRange = function(test) {
	checkOutput(test, "contains/ninDateRange.poc");
};

exports.testNinDict = function(test) {
	checkOutput(test, "contains/ninDict.poc");
};

exports.testNinIntegerRange = function(test) {
	checkOutput(test, "contains/ninIntegerRange.poc");
};

exports.testNinList = function(test) {
	checkOutput(test, "contains/ninList.poc");
};

exports.testNinSet = function(test) {
	checkOutput(test, "contains/ninSet.poc");
};

exports.testNinText = function(test) {
	checkOutput(test, "contains/ninText.poc");
};

exports.testNinTimeRange = function(test) {
	checkOutput(test, "contains/ninTimeRange.poc");
};

