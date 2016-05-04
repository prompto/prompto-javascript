require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testListRecords = function(test) {
	compareResourceEOE(test, "store/listRecords.pec");
};

exports.testManyRecords = function(test) {
	compareResourceEOE(test, "store/manyRecords.pec");
};

exports.testSimpleRecord = function(test) {
	compareResourceEOE(test, "store/simpleRecord.pec");
};

exports.testSlicedRecords = function(test) {
	compareResourceEOE(test, "store/slicedRecords.pec");
};

exports.testSortedRecords = function(test) {
	compareResourceEOE(test, "store/sortedRecords.pec");
};

exports.testSubRecord = function(test) {
	compareResourceEOE(test, "store/subRecord.pec");
};

