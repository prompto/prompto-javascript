require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testCyclic = function(test) {
	compareResourceEPE(test, "lazy/cyclic.e");
};

exports.testDict = function(test) {
	compareResourceEPE(test, "lazy/dict.e");
};

exports.testList = function(test) {
	compareResourceEPE(test, "lazy/list.e");
};

exports.testSet = function(test) {
	compareResourceEPE(test, "lazy/set.e");
};

exports.testTransient = function(test) {
	compareResourceEPE(test, "lazy/transient.e");
};

