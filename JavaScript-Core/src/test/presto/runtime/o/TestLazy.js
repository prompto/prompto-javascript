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
	checkOutput(test, "lazy/cyclic.o");
};

exports.testDict = function(test) {
	checkOutput(test, "lazy/dict.o");
};

exports.testList = function(test) {
	checkOutput(test, "lazy/list.o");
};

exports.testSet = function(test) {
	checkOutput(test, "lazy/set.o");
};

exports.testTransient = function(test) {
	checkOutput(test, "lazy/transient.o");
};

