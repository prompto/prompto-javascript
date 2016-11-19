require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testCyclic = function(test) {
	compareResourceOMO(test, "lazy/cyclic.poc");
};

exports.testDict = function(test) {
	compareResourceOMO(test, "lazy/dict.poc");
};

exports.testList = function(test) {
	compareResourceOMO(test, "lazy/list.poc");
};

exports.testSet = function(test) {
	compareResourceOMO(test, "lazy/set.poc");
};

exports.testTransient = function(test) {
	compareResourceOMO(test, "lazy/transient.poc");
};

