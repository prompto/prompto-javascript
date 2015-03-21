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

exports.testContainsAllList = function(test) {
	checkOutput(test, "contains/containsAllList.e");
};

exports.testContainsAllSet = function(test) {
	checkOutput(test, "contains/containsAllSet.e");
};

exports.testContainsAllText = function(test) {
	checkOutput(test, "contains/containsAllText.e");
};

exports.testContainsAllTuple = function(test) {
	checkOutput(test, "contains/containsAllTuple.e");
};

exports.testContainsAnyList = function(test) {
	checkOutput(test, "contains/containsAnyList.e");
};

exports.testContainsAnySet = function(test) {
	checkOutput(test, "contains/containsAnySet.e");
};

exports.testContainsAnyText = function(test) {
	checkOutput(test, "contains/containsAnyText.e");
};

exports.testContainsAnyTuple = function(test) {
	checkOutput(test, "contains/containsAnyTuple.e");
};

exports.testInCharacterRange = function(test) {
	checkOutput(test, "contains/inCharacterRange.e");
};

exports.testInDateRange = function(test) {
	checkOutput(test, "contains/inDateRange.e");
};

exports.testInDict = function(test) {
	checkOutput(test, "contains/inDict.e");
};

exports.testInIntegerRange = function(test) {
	checkOutput(test, "contains/inIntegerRange.e");
};

exports.testInList = function(test) {
	checkOutput(test, "contains/inList.e");
};

exports.testInSet = function(test) {
	checkOutput(test, "contains/inSet.e");
};

exports.testInText = function(test) {
	checkOutput(test, "contains/inText.e");
};

exports.testInTimeRange = function(test) {
	checkOutput(test, "contains/inTimeRange.e");
};

exports.testInTuple = function(test) {
	checkOutput(test, "contains/inTuple.e");
};

exports.testNinCharacterRange = function(test) {
	checkOutput(test, "contains/ninCharacterRange.e");
};

exports.testNinDateRange = function(test) {
	checkOutput(test, "contains/ninDateRange.e");
};

exports.testNinDict = function(test) {
	checkOutput(test, "contains/ninDict.e");
};

exports.testNinIntegerRange = function(test) {
	checkOutput(test, "contains/ninIntegerRange.e");
};

exports.testNinList = function(test) {
	checkOutput(test, "contains/ninList.e");
};

exports.testNinSet = function(test) {
	checkOutput(test, "contains/ninSet.e");
};

exports.testNinText = function(test) {
	checkOutput(test, "contains/ninText.e");
};

exports.testNinTimeRange = function(test) {
	checkOutput(test, "contains/ninTimeRange.e");
};

