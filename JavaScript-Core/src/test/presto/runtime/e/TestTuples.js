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

exports.testMultiAssignment = function(test) {
	checkOutput(test, "tuples/multiAssignment.e");
};

exports.testSingleAssignment = function(test) {
	checkOutput(test, "tuples/singleAssignment.e");
};

exports.testTupleElement = function(test) {
	checkOutput(test, "tuples/tupleElement.e");
};

