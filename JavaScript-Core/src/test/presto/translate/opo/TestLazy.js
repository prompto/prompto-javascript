require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testCyclic = function(test) {
	compareResourceOPO(test, "lazy/cyclic.o");
};

exports.testDict = function(test) {
	compareResourceOPO(test, "lazy/dict.o");
};

exports.testList = function(test) {
	compareResourceOPO(test, "lazy/list.o");
};

exports.testSet = function(test) {
	compareResourceOPO(test, "lazy/set.o");
};

exports.testTransient = function(test) {
	compareResourceOPO(test, "lazy/transient.o");
};

