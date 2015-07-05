// generated: 2015-07-05T23:01:02.021
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
	checkOutput(test, "contains/containsAllList.pec");
};

exports.testContainsAllSet = function(test) {
	checkOutput(test, "contains/containsAllSet.pec");
};

exports.testContainsAllText = function(test) {
	checkOutput(test, "contains/containsAllText.pec");
};

exports.testContainsAllTuple = function(test) {
	checkOutput(test, "contains/containsAllTuple.pec");
};

exports.testContainsAnyList = function(test) {
	checkOutput(test, "contains/containsAnyList.pec");
};

exports.testContainsAnySet = function(test) {
	checkOutput(test, "contains/containsAnySet.pec");
};

exports.testContainsAnyText = function(test) {
	checkOutput(test, "contains/containsAnyText.pec");
};

exports.testContainsAnyTuple = function(test) {
	checkOutput(test, "contains/containsAnyTuple.pec");
};

exports.testInCharacterRange = function(test) {
	checkOutput(test, "contains/inCharacterRange.pec");
};

exports.testInDateRange = function(test) {
	checkOutput(test, "contains/inDateRange.pec");
};

exports.testInDict = function(test) {
	checkOutput(test, "contains/inDict.pec");
};

exports.testInIntegerRange = function(test) {
	checkOutput(test, "contains/inIntegerRange.pec");
};

exports.testInList = function(test) {
	checkOutput(test, "contains/inList.pec");
};

exports.testInSet = function(test) {
	checkOutput(test, "contains/inSet.pec");
};

exports.testInText = function(test) {
	checkOutput(test, "contains/inText.pec");
};

exports.testInTimeRange = function(test) {
	checkOutput(test, "contains/inTimeRange.pec");
};

exports.testInTuple = function(test) {
	checkOutput(test, "contains/inTuple.pec");
};

exports.testNinCharacterRange = function(test) {
	checkOutput(test, "contains/ninCharacterRange.pec");
};

exports.testNinDateRange = function(test) {
	checkOutput(test, "contains/ninDateRange.pec");
};

exports.testNinDict = function(test) {
	checkOutput(test, "contains/ninDict.pec");
};

exports.testNinIntegerRange = function(test) {
	checkOutput(test, "contains/ninIntegerRange.pec");
};

exports.testNinList = function(test) {
	checkOutput(test, "contains/ninList.pec");
};

exports.testNinSet = function(test) {
	checkOutput(test, "contains/ninSet.pec");
};

exports.testNinText = function(test) {
	checkOutput(test, "contains/ninText.pec");
};

exports.testNinTimeRange = function(test) {
	checkOutput(test, "contains/ninTimeRange.pec");
};

