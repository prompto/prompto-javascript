// generated: 2015-07-05T23:01:02.093
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testCyclic = function(test) {
	compareResourceEOE(test, "lazy/cyclic.pec");
};

exports.testDict = function(test) {
	compareResourceEOE(test, "lazy/dict.pec");
};

exports.testList = function(test) {
	compareResourceEOE(test, "lazy/list.pec");
};

exports.testSet = function(test) {
	compareResourceEOE(test, "lazy/set.pec");
};

exports.testTransient = function(test) {
	compareResourceEOE(test, "lazy/transient.pec");
};

