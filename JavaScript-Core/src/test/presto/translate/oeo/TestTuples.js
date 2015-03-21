require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMultiAssignment = function(test) {
	compareResourceOEO(test, "tuples/multiAssignment.o");
};

exports.testSingleAssignment = function(test) {
	compareResourceOEO(test, "tuples/singleAssignment.o");
};

exports.testTupleElement = function(test) {
	compareResourceOEO(test, "tuples/tupleElement.o");
};

