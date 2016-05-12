require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testContainsItem = function(test) {
	compareResourceESE(test, "predicate/containsItem.pec");
};

exports.testEquals = function(test) {
	compareResourceESE(test, "predicate/equals.pec");
};

exports.testGreater = function(test) {
	compareResourceESE(test, "predicate/greater.pec");
};

exports.testInList = function(test) {
	compareResourceESE(test, "predicate/inList.pec");
};

exports.testLesser = function(test) {
	compareResourceESE(test, "predicate/lesser.pec");
};

exports.testNotEquals = function(test) {
	compareResourceESE(test, "predicate/notEquals.pec");
};

exports.testPartial = function(test) {
	compareResourceESE(test, "predicate/partial.pec");
};

exports.testRoughly = function(test) {
	compareResourceESE(test, "predicate/roughly.pec");
};

