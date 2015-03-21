require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testMultiAssignment = function(test) {
	compareResourceOPO(test, "tuples/multiAssignment.o");
};

exports.testSingleAssignment = function(test) {
	compareResourceOPO(test, "tuples/singleAssignment.o");
};

exports.testTupleElement = function(test) {
	compareResourceOPO(test, "tuples/tupleElement.o");
};

