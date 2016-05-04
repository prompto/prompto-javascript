require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testListRecords = function(test) {
	compareResourceESE(test, "store/listRecords.pec");
};

exports.testManyRecords = function(test) {
	compareResourceESE(test, "store/manyRecords.pec");
};

exports.testSimpleRecord = function(test) {
	compareResourceESE(test, "store/simpleRecord.pec");
};

exports.testSlicedRecords = function(test) {
	compareResourceESE(test, "store/slicedRecords.pec");
};

exports.testSortedRecords = function(test) {
	compareResourceESE(test, "store/sortedRecords.pec");
};

exports.testSubRecord = function(test) {
	compareResourceESE(test, "store/subRecord.pec");
};

