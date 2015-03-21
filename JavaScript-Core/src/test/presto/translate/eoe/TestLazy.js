require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCyclic = function(test) {
	compareResourceEOE(test, "lazy/cyclic.e");
};

exports.testDict = function(test) {
	compareResourceEOE(test, "lazy/dict.e");
};

exports.testList = function(test) {
	compareResourceEOE(test, "lazy/list.e");
};

exports.testSet = function(test) {
	compareResourceEOE(test, "lazy/set.e");
};

exports.testTransient = function(test) {
	compareResourceEOE(test, "lazy/transient.e");
};

