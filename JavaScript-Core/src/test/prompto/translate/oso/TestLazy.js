// generated: 2015-07-05T23:01:02.097
require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testCyclic = function(test) {
	compareResourceOSO(test, "lazy/cyclic.poc");
};

exports.testDict = function(test) {
	compareResourceOSO(test, "lazy/dict.poc");
};

exports.testList = function(test) {
	compareResourceOSO(test, "lazy/list.poc");
};

exports.testSet = function(test) {
	compareResourceOSO(test, "lazy/set.poc");
};

exports.testTransient = function(test) {
	compareResourceOSO(test, "lazy/transient.poc");
};

