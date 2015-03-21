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

exports.testMultiAssignment = function(test) {
	checkOutput(test, "tuples/multiAssignment.o");
};

exports.testSingleAssignment = function(test) {
	checkOutput(test, "tuples/singleAssignment.o");
};

exports.testTupleElement = function(test) {
	checkOutput(test, "tuples/tupleElement.o");
};

