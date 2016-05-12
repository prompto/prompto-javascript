require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testContainsItem = function(test) {
	compareResourceEOE(test, "predicate/containsItem.pec");
};

exports.testEquals = function(test) {
	compareResourceEOE(test, "predicate/equals.pec");
};

exports.testGreater = function(test) {
	compareResourceEOE(test, "predicate/greater.pec");
};

exports.testInList = function(test) {
	compareResourceEOE(test, "predicate/inList.pec");
};

exports.testLesser = function(test) {
	compareResourceEOE(test, "predicate/lesser.pec");
};

exports.testNotEquals = function(test) {
	compareResourceEOE(test, "predicate/notEquals.pec");
};

exports.testPartial = function(test) {
	compareResourceEOE(test, "predicate/partial.pec");
};

exports.testRoughly = function(test) {
	compareResourceEOE(test, "predicate/roughly.pec");
};

