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

exports.testInferDict = function(test) {
	checkOutput(test, "infer/inferDict.pec");
};

exports.testInferList = function(test) {
	checkOutput(test, "infer/inferList.pec");
};

exports.testInferSet = function(test) {
	checkOutput(test, "infer/inferSet.pec");
};

