// generated: 2015-07-05T23:01:02.226
require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testMultiAssignment = function(test) {
	compareResourceOEO(test, "tuples/multiAssignment.poc");
};

exports.testSingleAssignment = function(test) {
	compareResourceOEO(test, "tuples/singleAssignment.poc");
};

exports.testTupleElement = function(test) {
	compareResourceOEO(test, "tuples/tupleElement.poc");
};

