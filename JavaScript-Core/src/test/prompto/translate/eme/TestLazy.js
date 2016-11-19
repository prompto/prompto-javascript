require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testCyclic = function(test) {
	compareResourceEME(test, "lazy/cyclic.pec");
};

exports.testDict = function(test) {
	compareResourceEME(test, "lazy/dict.pec");
};

exports.testList = function(test) {
	compareResourceEME(test, "lazy/list.pec");
};

exports.testSet = function(test) {
	compareResourceEME(test, "lazy/set.pec");
};

exports.testTransient = function(test) {
	compareResourceEME(test, "lazy/transient.pec");
};

