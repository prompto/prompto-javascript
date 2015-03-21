require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testMultiAssignment = function(test) {
	compareResourceEPE(test, "tuples/multiAssignment.e");
};

exports.testSingleAssignment = function(test) {
	compareResourceEPE(test, "tuples/singleAssignment.e");
};

exports.testTupleElement = function(test) {
	compareResourceEPE(test, "tuples/tupleElement.e");
};

