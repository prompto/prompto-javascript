require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testContainsItem = function(test) {
	compareResourceEME(test, "predicate/containsItem.pec");
};

exports.testEquals = function(test) {
	compareResourceEME(test, "predicate/equals.pec");
};

exports.testGreater = function(test) {
	compareResourceEME(test, "predicate/greater.pec");
};

exports.testInList = function(test) {
	compareResourceEME(test, "predicate/inList.pec");
};

exports.testLesser = function(test) {
	compareResourceEME(test, "predicate/lesser.pec");
};

exports.testNotEquals = function(test) {
	compareResourceEME(test, "predicate/notEquals.pec");
};

exports.testPartial = function(test) {
	compareResourceEME(test, "predicate/partial.pec");
};

exports.testRoughly = function(test) {
	compareResourceEME(test, "predicate/roughly.pec");
};

