// generated: 2015-07-05T23:01:02.228
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
	checkOutput(test, "tuples/multiAssignment.poc");
};

exports.testSingleAssignment = function(test) {
	checkOutput(test, "tuples/singleAssignment.poc");
};

exports.testTupleElement = function(test) {
	checkOutput(test, "tuples/tupleElement.poc");
};

