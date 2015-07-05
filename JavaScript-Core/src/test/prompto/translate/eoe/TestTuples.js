// generated: 2015-07-05T23:01:02.223
require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testMultiAssignment = function(test) {
	compareResourceEOE(test, "tuples/multiAssignment.pec");
};

exports.testSingleAssignment = function(test) {
	compareResourceEOE(test, "tuples/singleAssignment.pec");
};

exports.testTupleElement = function(test) {
	compareResourceEOE(test, "tuples/tupleElement.pec");
};

