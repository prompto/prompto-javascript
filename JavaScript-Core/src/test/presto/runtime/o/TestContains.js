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
	checkOutput(test, "contains/containsAllList.o");
};

exports.testContainsAllSet = function(test) {
	checkOutput(test, "contains/containsAllSet.o");
};

exports.testContainsAllText = function(test) {
	checkOutput(test, "contains/containsAllText.o");
};

exports.testContainsAllTuple = function(test) {
	checkOutput(test, "contains/containsAllTuple.o");
};

exports.testContainsAnyList = function(test) {
	checkOutput(test, "contains/containsAnyList.o");
};

exports.testContainsAnySet = function(test) {
	checkOutput(test, "contains/containsAnySet.o");
};

exports.testContainsAnyText = function(test) {
	checkOutput(test, "contains/containsAnyText.o");
};

exports.testContainsAnyTuple = function(test) {
	checkOutput(test, "contains/containsAnyTuple.o");
};

exports.testInCharacterRange = function(test) {
	checkOutput(test, "contains/inCharacterRange.o");
};

exports.testInDateRange = function(test) {
	checkOutput(test, "contains/inDateRange.o");
};

exports.testInDict = function(test) {
	checkOutput(test, "contains/inDict.o");
};

exports.testInIntegerRange = function(test) {
	checkOutput(test, "contains/inIntegerRange.o");
};

exports.testInList = function(test) {
	checkOutput(test, "contains/inList.o");
};

exports.testInSet = function(test) {
	checkOutput(test, "contains/inSet.o");
};

exports.testInText = function(test) {
	checkOutput(test, "contains/inText.o");
};

exports.testInTimeRange = function(test) {
	checkOutput(test, "contains/inTimeRange.o");
};

exports.testInTuple = function(test) {
	checkOutput(test, "contains/inTuple.o");
};

exports.testNinCharacterRange = function(test) {
	checkOutput(test, "contains/ninCharacterRange.o");
};

exports.testNinDateRange = function(test) {
	checkOutput(test, "contains/ninDateRange.o");
};

exports.testNinDict = function(test) {
	checkOutput(test, "contains/ninDict.o");
};

exports.testNinIntegerRange = function(test) {
	checkOutput(test, "contains/ninIntegerRange.o");
};

exports.testNinList = function(test) {
	checkOutput(test, "contains/ninList.o");
};

exports.testNinSet = function(test) {
	checkOutput(test, "contains/ninSet.o");
};

exports.testNinText = function(test) {
	checkOutput(test, "contains/ninText.o");
};

exports.testNinTimeRange = function(test) {
	checkOutput(test, "contains/ninTimeRange.o");
};

