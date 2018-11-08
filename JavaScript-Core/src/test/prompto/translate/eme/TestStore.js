require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAsyncFetchMany = function(test) {
	compareResourceEME(test, "store/asyncFetchMany.pec");
};

exports.testAsyncFetchOne = function(test) {
	compareResourceEME(test, "store/asyncFetchOne.pec");
};

exports.testAsyncStore = function(test) {
	compareResourceEME(test, "store/asyncStore.pec");
};

exports.testDeleteRecords = function(test) {
	compareResourceEME(test, "store/deleteRecords.pec");
};

exports.testFlush = function(test) {
	compareResourceEME(test, "store/flush.pec");
};

exports.testListRecords = function(test) {
	compareResourceEME(test, "store/listRecords.pec");
};

exports.testManyRecords = function(test) {
	compareResourceEME(test, "store/manyRecords.pec");
};

exports.testManyUntypedRecords = function(test) {
	compareResourceEME(test, "store/manyUntypedRecords.pec");
};

exports.testSimpleRecord = function(test) {
	compareResourceEME(test, "store/simpleRecord.pec");
};

exports.testSlicedRecords = function(test) {
	compareResourceEME(test, "store/slicedRecords.pec");
};

exports.testSortedRecords = function(test) {
	compareResourceEME(test, "store/sortedRecords.pec");
};

exports.testSubRecord = function(test) {
	compareResourceEME(test, "store/subRecord.pec");
};

exports.testUntypedRecord = function(test) {
	compareResourceEME(test, "store/untypedRecord.pec");
};

