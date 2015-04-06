require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testMultiAssignment = function(test) {
	compareResourceOSO(test, "tuples/multiAssignment.poc");
};

exports.testSingleAssignment = function(test) {
	compareResourceOSO(test, "tuples/singleAssignment.poc");
};

exports.testTupleElement = function(test) {
	compareResourceOSO(test, "tuples/tupleElement.poc");
};

