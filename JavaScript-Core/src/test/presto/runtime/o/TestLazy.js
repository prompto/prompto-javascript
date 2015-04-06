require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testCyclic = function(test) {
	checkOutput(test, "lazy/cyclic.poc");
};

exports.testDict = function(test) {
	checkOutput(test, "lazy/dict.poc");
};

exports.testList = function(test) {
	checkOutput(test, "lazy/list.poc");
};

exports.testSet = function(test) {
	checkOutput(test, "lazy/set.poc");
};

exports.testTransient = function(test) {
	checkOutput(test, "lazy/transient.poc");
};

