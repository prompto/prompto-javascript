require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testMultiAssignment = function(test) {
	compareResourceOMO(test, "tuples/multiAssignment.poc");
};

exports.testSingleAssignment = function(test) {
	compareResourceOMO(test, "tuples/singleAssignment.poc");
};

exports.testTupleElement = function(test) {
	compareResourceOMO(test, "tuples/tupleElement.poc");
};

