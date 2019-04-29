require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAsyncFetchMany = function(test) {
	checkInterpretedOutput(test, "store/asyncFetchMany.pec");
};

exports.testTranspiledAsyncFetchMany = function(test) {
	checkTranspiledOutput(test, "store/asyncFetchMany.pec");
};

exports.testInterpretedAsyncFetchOne = function(test) {
	checkInterpretedOutput(test, "store/asyncFetchOne.pec");
};

exports.testTranspiledAsyncFetchOne = function(test) {
	checkTranspiledOutput(test, "store/asyncFetchOne.pec");
};

exports.testInterpretedAsyncStore = function(test) {
	checkInterpretedOutput(test, "store/asyncStore.pec");
};

exports.testTranspiledAsyncStore = function(test) {
	checkTranspiledOutput(test, "store/asyncStore.pec");
};

exports.testInterpretedDeleteRecords = function(test) {
	checkInterpretedOutput(test, "store/deleteRecords.pec");
};

exports.testTranspiledDeleteRecords = function(test) {
	checkTranspiledOutput(test, "store/deleteRecords.pec");
};

exports.testInterpretedFlush = function(test) {
	checkInterpretedOutput(test, "store/flush.pec");
};

exports.testTranspiledFlush = function(test) {
	checkTranspiledOutput(test, "store/flush.pec");
};

exports.testInterpretedListRecords = function(test) {
	checkInterpretedOutput(test, "store/listRecords.pec");
};

exports.testTranspiledListRecords = function(test) {
	checkTranspiledOutput(test, "store/listRecords.pec");
};

exports.testInterpretedManyRecords = function(test) {
	checkInterpretedOutput(test, "store/manyRecords.pec");
};

exports.testTranspiledManyRecords = function(test) {
	checkTranspiledOutput(test, "store/manyRecords.pec");
};

exports.testInterpretedManyUntypedRecords = function(test) {
	checkInterpretedOutput(test, "store/manyUntypedRecords.pec");
};

exports.testTranspiledManyUntypedRecords = function(test) {
	checkTranspiledOutput(test, "store/manyUntypedRecords.pec");
};

exports.testInterpretedSimpleRecord = function(test) {
	checkInterpretedOutput(test, "store/simpleRecord.pec");
};

exports.testTranspiledSimpleRecord = function(test) {
	checkTranspiledOutput(test, "store/simpleRecord.pec");
};

exports.testInterpretedSlicedRecords = function(test) {
	checkInterpretedOutput(test, "store/slicedRecords.pec");
};

exports.testTranspiledSlicedRecords = function(test) {
	checkTranspiledOutput(test, "store/slicedRecords.pec");
};

exports.testInterpretedSortedRecords = function(test) {
	checkInterpretedOutput(test, "store/sortedRecords.pec");
};

exports.testTranspiledSortedRecords = function(test) {
	checkTranspiledOutput(test, "store/sortedRecords.pec");
};

exports.testInterpretedSubRecord = function(test) {
	checkInterpretedOutput(test, "store/subRecord.pec");
};

exports.testTranspiledSubRecord = function(test) {
	checkTranspiledOutput(test, "store/subRecord.pec");
};

exports.testInterpretedUntypedRecord = function(test) {
	checkInterpretedOutput(test, "store/untypedRecord.pec");
};

exports.testTranspiledUntypedRecord = function(test) {
	checkTranspiledOutput(test, "store/untypedRecord.pec");
};

