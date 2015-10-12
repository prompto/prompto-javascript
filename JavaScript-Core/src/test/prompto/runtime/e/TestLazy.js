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
	checkOutput(test, "lazy/cyclic.pec");
};

exports.testDict = function(test) {
	checkOutput(test, "lazy/dict.pec");
};

exports.testList = function(test) {
	checkOutput(test, "lazy/list.pec");
};

exports.testSet = function(test) {
	checkOutput(test, "lazy/set.pec");
};

exports.testTransient = function(test) {
	checkOutput(test, "lazy/transient.pec");
};

