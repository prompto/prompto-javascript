require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMultiAssignment = function(test) {
	compareResourceEOE(test, "tuples/multiAssignment.e");
};

exports.testSingleAssignment = function(test) {
	compareResourceEOE(test, "tuples/singleAssignment.e");
};

exports.testTupleElement = function(test) {
	compareResourceEOE(test, "tuples/tupleElement.e");
};

