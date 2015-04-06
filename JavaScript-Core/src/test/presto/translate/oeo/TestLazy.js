require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testCyclic = function(test) {
	compareResourceOEO(test, "lazy/cyclic.poc");
};

exports.testDict = function(test) {
	compareResourceOEO(test, "lazy/dict.poc");
};

exports.testList = function(test) {
	compareResourceOEO(test, "lazy/list.poc");
};

exports.testSet = function(test) {
	compareResourceOEO(test, "lazy/set.poc");
};

exports.testTransient = function(test) {
	compareResourceOEO(test, "lazy/transient.poc");
};

