require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCyclic = function(test) {
	compareResourceOEO(test, "lazy/cyclic.o");
};

exports.testDict = function(test) {
	compareResourceOEO(test, "lazy/dict.o");
};

exports.testList = function(test) {
	compareResourceOEO(test, "lazy/list.o");
};

exports.testSet = function(test) {
	compareResourceOEO(test, "lazy/set.o");
};

exports.testTransient = function(test) {
	compareResourceOEO(test, "lazy/transient.o");
};

