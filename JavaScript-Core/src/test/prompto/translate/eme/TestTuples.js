require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testMultiAssignment = function(test) {
	compareResourceEME(test, "tuples/multiAssignment.pec");
};

exports.testSingleAssignment = function(test) {
	compareResourceEME(test, "tuples/singleAssignment.pec");
};

exports.testTupleElement = function(test) {
	compareResourceEME(test, "tuples/tupleElement.pec");
};

