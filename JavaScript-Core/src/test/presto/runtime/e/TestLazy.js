require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testCyclic = function(test) {
	checkOutput(test, "lazy/cyclic.e");
};

exports.testDict = function(test) {
	checkOutput(test, "lazy/dict.e");
};

exports.testList = function(test) {
	checkOutput(test, "lazy/list.e");
};

exports.testSet = function(test) {
	checkOutput(test, "lazy/set.e");
};

exports.testTransient = function(test) {
	checkOutput(test, "lazy/transient.e");
};

